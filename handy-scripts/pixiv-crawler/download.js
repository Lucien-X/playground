const fs = require('fs');
const path = require('path');
const stream = require('stream');
const { promisify } = require('util');
const filenamify = require('filenamify');
const httpclient = require('./httpclient');
const taskQuene = require('./logs/taskQuene.json');

const pipeline = promisify(stream.pipeline);

(async () => {
  console.log('=========================================== Download Start ===========================================');
  const DIR_PATH = path.join(__dirname, 'downloaded', filenamify(taskQuene[0].origin.userName));
  try {
    fs.mkdirSync(DIR_PATH, { recursive: true });
  } catch (error) {
    // 文件夹已经存在会报错，此时不作处理
  }
  const total = taskQuene.length;
  let skiped = 0;
  let downloaded = 0;
  const summary = () => console.log(`\n【Summary】Total: ${total}, Downloaded: ${downloaded}, Skiped: ${skiped}, Rest: ${total - downloaded - skiped}\n`);
  try {
    const operator = async () => {
      if (taskQuene.length !== 0) {
        const task = taskQuene[0];
        console.log(JSON.stringify(task, null, 4));
        const filePath = path.join(DIR_PATH, task.filename);
        if (fs.existsSync(filePath)) {
          skiped++;
        } else {
          await pipeline(
            httpclient(task.url, { isStream: true }),
            fs.createWriteStream(filePath),
          );
          downloaded++;
        }
        taskQuene.shift(); // 写文件成功后再移除，这样该条会出现在失败dump中
        await operator();
      }
    };
    await operator();
  } catch (error) {
    const dumpDest = path.join(__dirname, '/logs/taskQueneDump.json');
    fs.writeFileSync(
      dumpDest,
      JSON.stringify(taskQuene, null, 4)
    );
    console.error(`发生错误，剩余任务日志已输出至${dumpDest}\n`, error);
    summary();
  }
  summary();
  console.log('=========================================== Download Done ===========================================');
})();