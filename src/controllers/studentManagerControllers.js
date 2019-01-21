// 导出的一个方法 该方法获取注册页面
const path = require('path')
const MongoClient = require('mongodb').MongoClient;

//导入第三方包
const template = require("art-template");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'twzcc';
const getstudentsList = (req, res) => {

    const keyword = req.query.keyword || ''
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('studentsInfo');
        //查询一个
        collection.find({
            name: {
                $regex: keyword
            }
        }).toArray((err, docs) => {
            console.log(docs)
            //关闭数据库
            client.close();
            //渲染页面
            const html = template(path.join(__dirname, '../public/views/list.html'), {
                students: docs,
                keyword
            })
            console.log(html)
            res.send(html)
        })
    })
}


//导出
module.exports = {
    getstudentsList
}