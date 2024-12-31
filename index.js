const express = require('express')
const app = express()
const asyncHandler = require('express-async-handler'); // 捕获异步错误

const bodyParser = require('body-parser')
const json = express.json({type: '*/json'})
const authMiddleware = require('./middleware/auth');

app.use(json)
app.use(bodyParser.urlencoded({ extended: false }))
// 设置模板引擎为 EJS
app.set('view engine', 'ejs');
// 设置模板文件存放目录（默认为 views 文件夹）
app.set('views', './views');

// 全局认证中间件
app.use(authMiddleware);


const globalErrorHandler = require('./AppErrorHandler')

const port = 6000

const stunRouter = require('./routers/stun.js');

app.use('/stun',stunRouter)

// 全局错误处理中间件
app.use(globalErrorHandler);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
