// 导出的一个方法 该方法获取注册页面
const path = require('path')
//导入封装函数
const databasetool = require(path.join(__dirname, '../tools/databasetool'))

//导入第三方包
const template = require("art-template");
const getstudentsList = (req, res) => {

    const keyword = req.query.keyword || ''
    databasetool.findMany("studentsInfo", {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {
        console.log(docs)
        //  渲染页面
        const html = template(path.join(__dirname, '../public/views/list.html'), {
            students: docs,
            keyword,
            loginName:req.session.loginName
        })

        // console.log(html)
        res.send(html)
    })
}
//新增页面
const getAddstudentsPage = (req, res) => {
    //调用模板
    //  渲染页面
    const html = template(path.join(__dirname, '../public/views/add.html'), {loginName:req.session.loginName})
    // console.log(html)
    res.send(html)
}

//新增学生信息页面
const addstudent = (req, res) => {
    console.log(req.body)

    databasetool.insertSingle('studentsInfo', req.body, (req, result) => {
        if (!result) {
            res.send(`<script>alert("插入失败!")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
}
//编辑信息页面
const geteditstudent = (req, res) => {
    // console.log("111111111111")
    console.log(req.params.studentId)
    const _id = databasetool.ObjectId(req.params.studentId);
    console.log(_id)
    databasetool.findOne('studentsInfo',{_id} , (err,doc) => {
        doc.loginName = req.session.loginName
        //根据数据u渲染页面
        const html = template(path.join(__dirname, '../public/views/edit.html'), doc)
        // console.log(html)
        res.send(html)
    })

}
//得到页面就更新编辑后的数据
const editstudent = (req, res) => {
    const _id = databasetool.ObjectId(req.params.studentId);
    databasetool.insertSingle('studentsInfo', req.body, (req, result) => {
        if (!result) {
            res.send(`<script>alert("新增失败!")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })

}
//删除学生信息
const deletestudent=(req,res)=>{
    const _id = databasetool.ObjectId(req.params.studentId);
    databasetool.deleteOne('studentsInfo',{_id} ,(err,result)=>{
        if (!result) {
            res.send(`<script>alert("删除失败!")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })

}
//导出
module.exports = {
    getstudentsList,
    getAddstudentsPage,
    addstudent,
    geteditstudent,
    editstudent,
    deletestudent
}