//导包
const path=require('path')
const express = require('express')
//创建路由对象
const studentManagerRouter = express.Router()
//导入控制器模块
const studentManagerControllers = require(path.join(__dirname, "../controllers/studentManagerControllers"))
//发送请求
studentManagerRouter.get('/list', studentManagerControllers.getstudentsList)
//获取新增页面
studentManagerRouter.get('/add', studentManagerControllers.getAddstudentsPage)
//获取新增学生信息
studentManagerRouter.post('/add', studentManagerControllers.addstudent)
//获取编辑页面信息
studentManagerRouter.get('/edit/:studentId', studentManagerControllers.geteditstudent)
//获取编辑后的页面信息
 studentManagerRouter.post('/edit/:studentId', studentManagerControllers.editstudent)
 //删除信息
 studentManagerRouter.get('/delete/:studentId', studentManagerControllers.deletestudent)
//导出路由对象
module.exports = studentManagerRouter