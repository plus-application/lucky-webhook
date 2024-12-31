// routes/user.js
const express = require('express');
const router = express.Router();
const stun = require('../dao/stun');
// 用户路由
router.post('/', asyncWrapper(async (req, res,next) => {
    const {port,ip,ipAddr,ruleName,time,ddns} = req.body
    // 获取当前时间戳作为 `create_time`
    const createTime = Math.floor(Date.now() / 1000);
    await stun.saveOrUpdate({ ruleName, ip, port, ipAddr,ddns,time, createTime })
    res.json({ code: 0, message: 'OK' });
}));
// 查询所有 stun 表记录
router.get('/all', asyncWrapper( async (req, res) => {
    const records = await stun.findAll()
    res.json(records);
}));
// 按 ruleName 查询一条记录
router.get('/rule', asyncWrapper( async (req, res) => {
    let ruleName = req.query.ruleName
    if(!ruleName){
        throw new AppError(400,'ruleName is required')
    }
    const record = await stun.findByRuleName(ruleName)
    res.json(record);
}));

// 重定向接口
router.get('/redirect', asyncWrapper( async (req, res) => {
    let ruleName = req.query.ruleName
    if(!ruleName){
        throw new AppError(400,'ruleName is required')
    }
    const record = await stun.findByRuleName(ruleName)
    if(!record){
        throw new AppError(400,'rule not found')
    }
    // 如果有 ddns，使用 ddns 作为重定向地址,否则使用 ipAddr
    record.redirect = record.ipAddr
    if(record.ddns){
        record.redirect = record.ddns+':'+record.port
    }
    // 渲染模板，并附加参数
    res.render('stun_redirect', record);
}));

module.exports = router;