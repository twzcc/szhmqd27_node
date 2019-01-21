//导包
const path=require('path')
const express = require('express')
//创建路由对象
const studentManagerRouter = express.Router()
//导入控制器模块
const studentManagerControllers = require(path.join(__dirname, "../controllers/studentManagerControllers"))
//发送请求
studentManagerRouter.get('/list', studentManagerControllers.getstudentsList)
//导出路由对象
module.exports = studentManagerRouter