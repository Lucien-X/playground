const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'console.log(1)',
  database: 'test'
});

const executor = (
  sql,
  sqlParams,
  callback = (sql, sqlParams, result) => {
    return  console.log(`\n\nsql:${sql}\nsqlParams:${sqlParams}\nresult:${JSON.stringify(result, null, 4)}`);
  }
) => {
  return connection.query(sql, sqlParams, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(sql, sqlParams, result);
  });
};

// C
const createSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
const createSqlParams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN'];
executor(createSql, createSqlParams);

// U
const updateSql = 'UPDATE websites SET name = ?,url = ? WHERE alexa = ?';
const updateSqlParams = ['菜鸟移动站', 'https://m.runoob.com', '23453'];
executor(updateSql, updateSqlParams);

// R
const retriveSql = 'SELECT * FROM websites ORDER BY alexa';
executor(retriveSql);

// D
const deleteSql = "DELETE FROM websites WHERE alexa = '23453'";
executor(deleteSql);

connection.end();