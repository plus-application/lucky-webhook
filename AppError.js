// 定义 AppError 类
class AppError extends Error {
  constructor(code,message) {
      super(message);
      this.code = code || 500; // 默认状态码
      this.isOperational = true; // 标记为可预期的操作错误
  }
}
const asyncWrapper = (fn) => {
  return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
  };
};

global.asyncWrapper = asyncWrapper;

// 将 AppError 挂载到 global
global.AppError = AppError;
