//导包
const express = require('express')
const path=require('path')
//发送post请求需要设置
var bodyParser = require('body-parser')
var session = require('express-session')


//创建a'p'p
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//设置静态资源
app.use(express.static(path.join(__dirname,'public')))
// Use the session middleware
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false,  cookie: { maxAge: 60000 }}))
//导入路由对象
const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'))

//导入学生列表对象
const studentManagerRouter=require(path.join(__dirname,'routers/studentManagerRouter.js'))
app.use('/account',accountRouter)

app.use("/studentmanager", studentManagerRouter);
//启动
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)
    }
    console.log('start ok')
})