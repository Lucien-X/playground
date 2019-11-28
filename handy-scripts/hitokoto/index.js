#!/usr/bin/env node

/**
 * A simple QOTD(Quote Of The Day)
 * Author: https://github.com/Lucien-X
 *
 * To get a decent display effect,
 * please install and use "Sarasa Mono" font
 * https://github.com/be5invis/Sarasa-Gothic
 */
'use strict';
// Get Standard Lib
const https = require('https');
const boxen = require('boxen');

// Define Constants
const CAT_MAP = {
  a: '动画',
  b: '漫画',
  c: '游戏',
  d: '小说',
  e: '原创',
  f: '网络',
  g: '其他',
};
const TITLE = 'Hitokoto';
const PADDING = 2;
const WHITE_SPACE = ' ';
const FULL_ANGLE_REGEX = /[^\x00-\xff!…!—!“!”!█!▄!▀!─]/g;
const COLOR_TEMP_STRING = '\x1b[30;47m%s\x1b[0m';

// Define Utils
const log = info =>
  info.split('\n').forEach(line => console.log(COLOR_TEMP_STRING, line));
const stamp2date = stamp => new Date(Number(stamp + '000')).toLocaleString();
const full2semi = str => str.replace(FULL_ANGLE_REGEX, '__');
const beautify = str =>
  '、|，|,|：|:|；|;|。 |. |？|?'.split('|').reduce((prev, next) => {
    return prev.split(next).join(next + '\n');
  }, str);
const render = obj => {
  const str = beautify(obj.hitokoto);
  let lines = str.split('\n');
  const longestLength = lines
    .concat()
    .sort((a, b) => full2semi(b).length - full2semi(a).length)[0].length;
  const lineLength = (longestLength < 20 ? 20 : longestLength) * 2;
  const padFactory = methodName => line => {
    const fullAngleChar = line.match(FULL_ANGLE_REGEX) || [];
    return line[methodName](lineLength - fullAngleChar.length).replace(
      / /g,
      WHITE_SPACE,
    );
  };
  const padRight = padFactory('padEnd');
  const padLeft = padFactory('padStart');
  const lineBreak = WHITE_SPACE.repeat(PADDING - 1)
    .split('')
    .map(padRight);
  const author = [' —— ' + CAT_MAP[obj.type] + '「' + obj.from + '」'].map(
    padLeft,
  );
  const uploader = [obj.creator, stamp2date(obj.created_at)].map(padRight);
  const spaceForQuote = WHITE_SPACE.repeat(3);
  lines = ['『']
    .map(padRight)
    .concat(lines.map(i => spaceForQuote + i).map(padRight))
    .concat(
      [WHITE_SPACE.repeat(longestLength * 2) + spaceForQuote + '』'].map(
        padRight,
      ),
    );
  const ret = [TITLE]
    .concat(lineBreak)
    .concat(lines)
    .concat(author)
    .concat(lineBreak)
    .concat(uploader)
    .join('\n');
  return boxen(ret, { padding: 1, borderStyle: 'double', align: 'center' });
};

// Now do Business
https
  .get('https://v1.hitokoto.cn', resp => {
    let data = '';
    resp.on('data', chunk => {
      data += chunk;
    });
    resp.on('end', () => {
      log(render(JSON.parse(data)));
    });
  })
  .on('error', () => {
    const errorMsg = {
      hitokoto: `ERR_INTERNET_DISCONNECTED

             ████████████
            ███▄██████████
            ██████████████
            ██████▀▀▀▀▀▀▀▀
█          ██████████████
██      ███████████
████  █████████████████
 ██████████████████  ███
  ████████████████
─── ███████  ████ ─────────
  ─  ███       ██        ─
──  ─ ████     ████  ─ ─
`,
      type: 'g',
      from: 'Lucien-X',
      creator: 'https://github.com/Lucien-X',
      created_at: Math.floor(new Date().getTime() / 1000),
    };
    log(render(errorMsg));
  });
