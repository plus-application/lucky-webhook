const config = require('../config.json');

const whitelist = config.whiteList||[]
module.exports = (req, res, next) => {
    const clientIP = req.ip; // 获取客户端 IP
    console.log('request from:', clientIP);
    // 验证 IP 地址
    const allowedIPs = config.auth.allowedIPs;
    const isIPAllowed = allowedIPs.some(ipPattern => {
      const regexPattern = new RegExp(`^${ipPattern.replace(/\*/g, '.*')}$`);
      return regexPattern.test(clientIP);
    });
    if (!isIPAllowed) {
      return res.status(403).json({ code:403, message: 'Forbidden: Access denied from this IP' });
    }
    // 验证白名单
    const path = req.path;
    console.log('request path:', path);
    if (whitelist.includes(path)) {
        next();
        return
    }
    // 验证 API 密钥
    const token = req.headers['x-token']; // 从请求头中获取 Token
    if (token !== config.auth.token) {
        return res.status(401).json({ code:401,message: 'Unauthorized: Invalid Token' });
    }


    // 通过认证，继续处理请求
    next();
};
