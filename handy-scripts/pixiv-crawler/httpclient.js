const got = require('got');
const { HttpsProxyAgent } = require('hpagent');
const { COOKIE, HTTP_PROXY } = require('./config');

const defaultConfig = {
  agent: {
		https: new HttpsProxyAgent({
			keepAlive: true,
			keepAliveMsecs: 1000,
			maxSockets: 256,
			maxFreeSockets: 256,
			scheduling: 'lifo',
			proxy: HTTP_PROXY
		})
  },
  headers: {
    'cache-control':' max-age=0',
    'dnt':' 1',
    'upgrade-insecure-requests':' 1',
    'user-agent':' Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'accept':' text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site':' none',
    'sec-fetch-mode':' navigate',
    'sec-fetch-user':' ?1',
    'sec-fetch-dest':' document',
    'referer':' https://www.pixiv.net/',
    'accept-language': ' zh-CN,zh;q=0.9,en;q=0.8',
    'cookie': COOKIE,
  }
};

module.exports = (path, config) => {
  return got(path, Object.assign({}, defaultConfig, config));
};