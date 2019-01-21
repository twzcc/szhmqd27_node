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
            keyword
        })
        
        // console.log(html)
        res.send(html)
    })
}
//导出
module.exports = {
    getstudentsList
}
// MongoClient.connect(url, {
//     useNewUrlParser: true
// }, function (err, client) {
//     //拿到db
//     const db = client.db(dbName);
//     //拿到集合
//     const collection = db.collection('studentsInfo');
//     //查询一个
//     collection.find({
//         name: {
//             $regex: keyword
//         }
//     }).toArray((err, docs) => {
//         console.log(docs)
//         //关闭数据库
//         client.close();
//         //渲染页面
//         const html = template(path.join(__dirname, '../public/views/list.html'), {
//             students: docs,
//             keyword
//         })
//         console.log(html)
//         res.send(html)
//     })
// })