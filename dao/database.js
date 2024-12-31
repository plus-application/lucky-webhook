const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// 获取项目根路径
const projectRoot = path.resolve(process.cwd());
// 初始化 SQLite 数据库连接
const db = new sqlite3.Database(path.join(projectRoot,'data/db.sqlite'), (err) => {
    if (err) {
        console.error('Failed to connect to SQLite database:', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// 创建表（如果不存在）
db.serialize(() => {
    db.run(`
        create table if not exists stun(
          id integer primary key,
          ruleName text not null UNIQUE,
          ip text not null,
          port integer not null,
          ipAddr text not null,
          ddns text null,
          time integer not null,
          create_time integer not null
        );
    `);
});

module.exports = db;
