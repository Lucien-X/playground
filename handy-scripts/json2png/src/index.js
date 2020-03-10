#!/usr/bin/env node
'use strict';
// 内置包
const fs = require('fs');
const path = require('path');

// 二方包
const logo = require('./lib/logo');
const log = require('./lib/log');
const rmrf = require('./lib/rmrf');
const move = require('./lib/move');
const pkg = require('../package.json');

log.info(`${logo}
版本: ${pkg.version}
作者: https://github.com/Lucien-X
用途: 将Lottie动画的JSON格式转换成PNG序列帧
依赖：请提前安装好Google Chrome
`);

// 三方包
const readlineSync = require('readline-sync');
const open = require('open');
const renderLottie = require('./lib/puppeteer-lottie');

try {
  let [fileFullPath] = process.argv.slice(2);
  if (!fileFullPath) {
    fileFullPath = readlineSync.question(`==========================================
[使用方法]
请将JSON文件拖拽至此，点击窗口，按下回车。

直接输入完整文件路径，按下回车也可；
按下 Ctrl+C 组合键可强行终止程序。
==========================================
`);
  }
  const filePathObj = path.parse(fileFullPath);
  const { name: fileName, dir: fileDir, ext: fileExt } = filePathObj;
  if (fileExt !== '.json') {
    throw new Error('仅支持json拓展名的文件输入');
  }
  // 定义常量
  const TEMP = './temp';
  const DEST = `${path.resolve(fileDir)}/${fileName}_${new Date().getTime()}/`;

  const executor = async done => {
    // 清理临时文件夹
    if (fs.existsSync(TEMP)) {
      rmrf(TEMP);
    }
    fs.mkdirSync(TEMP);
    
    // Render each frame of the animation as PNG images
    await renderLottie({
      path: `${fileFullPath}`,
      output: `${TEMP}/frame-%d.png`, // sprintf format
    });

    // // Render the first frame of the animation as a JPEG image
    // await renderLottie({
    //   path: 'bodymovin.json',
    //   output: `${TEMP}/preview.jpg`,
    // });
    // // Create a GIF with width 640px from a lottie animation
    // // gifski needed
    // await renderLottie({
    //   path: 'bodymovin.json',
    //   output: `${TEMP}/example.gif`,
    // });
    // // Create an MP4 from a lottie animation
    // // ffmpeg needed
    // await renderLottie({
    //   path: 'bodymovin.json',
    //   output: `${TEMP}/example.mp4`,
    // });

    // 将临时文件夹中的文件，移动到目标路径
    move(TEMP, DEST, () => {
      log.warn(`转换成功！文件已输出至：\n ${DEST}`);
      log.warn('2秒后将自动打开文件夹...');
      setTimeout(() => {
        open(DEST);
      }, 2000);
    });
  };

  executor();
} catch (err) {
  log.error('好像有哪里不对,以下是错误日志：\n');
  log.error(err);
  process.exit(1);
}
