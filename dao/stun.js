const db = require('./database');
// 插入或更新记录
async function saveOrUpdate({ ruleName, ip, port, ipAddr, ddns,time, createTime }) {
  return new Promise((resolve, reject) => {
      const query = `
          INSERT INTO stun (ruleName, ip, port, ipAddr,ddns, time, create_time)
          VALUES (?, ?, ?, ?, ?,?, ?)
          ON CONFLICT(ruleName)
          DO UPDATE SET
              ip = excluded.ip,
              port = excluded.port,
              ipAddr = excluded.ipAddr,
              ddns = excluded.ddns,
              time = excluded.time,
              create_time = excluded.create_time
      `;
      db.run(query, [ruleName, ip, port, ipAddr, ddns,time, createTime], function (err) {
          if (err) {
              return reject(err);
          }
          resolve(this.lastID); // 返回最后插入或更新的记录 ID
      });
  });
}
// 查询 stun 表中所有记录
async function findAll() {
  return new Promise((resolve, reject) => {
      const query = `SELECT * FROM stun`;
      db.all(query, [], (err, rows) => {
          if (err) {
              return reject(err);
          }
          resolve(rows); // 返回查询结果
      });
  });
}
// 按ruleName查询一条记录
async function findByRuleName(ruleName) {
  return new Promise((resolve, reject) => {
      const query = `SELECT * FROM stun WHERE ruleName = ? limit 1`;
      db.get(query, [ruleName], (err, row) => {
          if (err) {
              return reject(err);
          }
          resolve(row); // 返回查询结果
      });
  });
}

module.exports = {
  saveOrUpdate,findAll,findByRuleName
}