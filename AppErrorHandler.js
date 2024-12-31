const AppError = require('./AppError')
// 全局错误处理中间件
function globalErrorHandler(err, req, res, next) {
  // 如果是自定义错误，直接使用其状态码和消息
  let code = err.code;
  const message = err.message || 'Internal Server Error';

  console.error('Error occurred:', err);

  // 返回标准化的错误响应
  res.status(code?418:500).json({
      code: code || 0,
      message: message,
      url:req.url
  });
}
module.exports = globalErrorHandler;