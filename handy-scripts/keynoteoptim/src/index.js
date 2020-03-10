#!/usr/bin/env node
'use strict';
// 内置包
const fs = require('fs');
const path = require('path');

// 二方包
const logo = require('./lib/logo');
const log = require('./lib/log');
const copy = require('./lib/copy');
const move = require('./lib/move');
const rmrf = require('./lib/rmrf');
const pkg = require('../package.json');

// 三方包
const readlineSync = require('readline-sync');
const adm_zip = require('adm-zip');
const sharp = require('sharp');
const ora = require('ora');

log.info(`${logo}
版本: ${pkg.version}
作者: https://github.com/Lucien-X
用途: 批量压缩Keynote中的图片，以缩减文件大小
注意：只支持OSX等类linux环境
`);

try {
  let [filePath] = process.argv.slice(2);
  if (!filePath) {
    filePath = readlineSync.question(`==========================================
[使用方法]
请将keynote文件拖拽至此，点击窗口，按下回车。

直接输入完整文件路径，按下回车也可；
按下 Ctrl+C 组合键可强行终止程序。
==========================================
`);
  } else if (filePath === '-h' || filePath === '--help'){
    console.log(`
[使用方式]
1. 输入 keynoteoptim 指令并回车，进入交互式命令行
2. 输入类似 keynoteoptim /this/is/an/absolute/url/bullshit.key 并回车，直接启动处理程式
`);
    process.exit(0);
  }
  const filePathObj = path.parse(filePath);
  const { name: fileName, dir: fileDir, ext: fileExt } = filePathObj;
  if (fileExt !== '.key') {
    throw new Error('仅支持.key拓展名的文件输入');
  }
  const BASE_DIR = `${fileDir}/${fileName}`;
  const tempPath = `${BASE_DIR}_temp.key`;
  const zipPath = `${BASE_DIR}_temp.zip`;
  const extractPath = `${BASE_DIR}_temp`;
  const assetPath = `${extractPath}/Data`;
  const compressedPath = `${BASE_DIR}_compressed.key`;

  const getFileSize = path => (fs.statSync(path).size / 1000000).toFixed(2);
  const initialSize = getFileSize(filePath);
  const initialTime = new Date().getTime();

  log.info(`\n======================== Keynote压缩开始 ========================\n`);
  const spinner = ora({spinner: 'dots8'}).start();
  spinner.info(`预处理中...`).start();
  // 拷贝副本
  copy(filePath, tempPath, () => {
    // 重命名 .key => .zip
    move(tempPath, zipPath, () => {
      // 解压缩
      const unzip = new adm_zip(zipPath);
      unzip.extractAllTo(extractPath, /*overwrite*/true);
      fs.unlinkSync(zipPath);
      // 图像优化
      spinner.succeed(`预处理完成`).start();
      spinner.info(`图像批处理中...`).start();
      const assetList = fs.readdirSync(assetPath);
      const promises = assetList.map(async (val, idx, arr) => {
        const { name, dir, ext } = path.parse(`${assetPath}/${val}`);
        const imagePath = `${dir}/${name}${ext}`;
        // https://sharp.pixelplumbing.com/api-constructor#sharp
        const isImage = [
          '.jpg',
          '.jpeg',
          '.png',
          '.webp',
          '.gif',
          '.svg',
          '.tiff',
          // '.bmp',
        ].indexOf(ext.toLowerCase()) !== -1;
        if (isImage) {
          const buffer = await sharp(imagePath).toBuffer();
          fs.writeFileSync(imagePath, buffer);
        }
      });

      // 图像批处理耗时较长，给个进度条
      let counter = 0;
      promises.forEach(promise => {
        promise.then(() => {
          spinner.text = `图像批处理中...(${++counter}/${assetList.length})`;
        }).catch(err => { throw err; })
      });

      Promise.all(promises).then(() => {
        spinner.succeed(`图像批处理 ${counter}/${assetList.length}`).start();
        spinner.info(`后处理中...`).start();
        // 重压缩
        var zip = new adm_zip();
        zip.addLocalFolder(extractPath);
        zip.writeZip(zipPath);
        rmrf(extractPath);
        // 重命名 .zip => .key
        move(zipPath, compressedPath, () => {
          const finalTime = new Date().getTime();
          const timeSpan = ((finalTime - initialTime) / 1000).toFixed(2);
          spinner.succeed(`后处理完成`);
          spinner.info(`总耗时 ${timeSpan} 秒`);
          const finalSize = getFileSize(compressedPath);
          const compressRatio = (((initialSize - finalSize) / initialSize) * 100).toFixed(2);
          log.info(`\n${filePath}`);
          log.info(`${initialSize} MB => ${finalSize} MB, 体积减少了 ${compressRatio}%`);
          log.info(compressedPath);
          log.info(`\n======================== Keynote压缩完成 ========================\n`);
        });
      }).catch(err => {
        throw err;
      });
    })
  });

} catch (err) {
  log.error('好像有哪里不对,以下是错误日志：\n');
  log.error(err);
  process.exit(1);
}