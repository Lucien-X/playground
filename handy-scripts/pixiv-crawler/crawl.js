const fs = require('fs');
const path = require('path');
const filenamify = require('filenamify');
const httpclient = require('./httpclient');
const { USER_ID } = require('./config');

const PAGE_SIZE = 18;

const getFileNameSuffix = (filename) => {
  if (filename.indexOf('.') === -1) {
    return '';
  }
  return (filename.split('.').pop() || '').toLowerCase();
};

(async () => {
  try {
    fs.mkdirSync(path.join(__dirname, 'logs'));
  } catch (error) {
    // 文件夹已经存在会报错，此时不作处理
  }
  try {
    console.log('=========================================== Fetching Index...... ===========================================');
    const indexUrl = `https://www.pixiv.net/ajax/user/${USER_ID}/profile/all?lang=zh`;
    console.log(indexUrl);
    const resp1 = await httpclient(
      indexUrl,
    );
    // console.log(resp1.body);
    let projectIdList = [];
    const illusts = JSON.parse(resp1.body).body.illusts;
    const manga = JSON.parse(resp1.body).body.manga;
    if (typeof illusts === 'object') {
      projectIdList = projectIdList.concat(Object.keys(illusts));
    }
    if (typeof manga === 'object') {
      projectIdList = projectIdList.concat(Object.keys(manga));
    }
    const quene = [];
    for (let idx = 0; idx < projectIdList.length; idx = idx + PAGE_SIZE) {
      quene.push(projectIdList.slice(idx, idx + PAGE_SIZE));
    }
    console.log('=========================================== Collecting Projects...... ===========================================');
    let worksStack = [];
    const operator = async () => {
      if (quene.length !== 0) {
        const ids = quene.pop();
        const idsStr = ids.reduce((prev, curr, idx) => {
          let splitChar = '';
          if (idx !== 0) {
            splitChar = '&';
          }
          return prev + `${splitChar}${encodeURIComponent('ids[]')}=${encodeURIComponent(curr)}`;
        }, '');
        const targetUrl = `https://www.pixiv.net/ajax/user/${USER_ID}/illusts?${idsStr}&lang=zh`;
        console.log(targetUrl);
        const resp2 = await httpclient(
          targetUrl,
        );
        // console.log(resp2.body);
        const works = Object.values(JSON.parse(resp2.body).body);
        worksStack = worksStack.concat(works);
        await operator();
      }
    };
    await operator();
    console.log('=========================================== Collecting Pages for Projects...... ===========================================');
    const taskQuene = [];
    const operator1 = async () => {
      if (worksStack.length !== 0) {
        const item = worksStack.pop();
        const { id, title } = item;
        const pagesUrl = `https://www.pixiv.net/ajax/illust/${id}/pages?lang=zh`;
        console.log(pagesUrl);
        const resp3 = await httpclient(
          pagesUrl,
        );
        const pages = JSON.parse(resp3.body).body;
        pages.forEach((page, idx) => {
          const originalUrl = page.urls.original;
          taskQuene.push({
            filename: `${id}_${filenamify(title)}_${idx}.${getFileNameSuffix(originalUrl)}`,
            url: originalUrl,
            origin: item,
            pages: pages,
          })
        });
        await operator1();
      }
    };
    await operator1();
    fs.writeFileSync(
      path.join(__dirname, `/logs/taskQuene_${USER_ID}.json`),
      JSON.stringify(taskQuene, null, 4)
    );
    console.log('=========================================== Crawling Done...... ===========================================');
	} catch (error) {
		console.log(error.response.body);
	}
})();
