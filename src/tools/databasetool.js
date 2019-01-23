const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'twzcc';

// mongodb的代码
/**
 * 
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callBack 回调函数 把结果返回给控制器
 */
//插入数据封装
const insertSingle = (collectionName, data, callBack) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //插入一个
        collection.insertOne(data, (err, result) => {
            //关闭数据库
            client.close();
            //执行回调函数
            callBack(err, result)
        })

    })
}
//查询一个数据库封装
const findOne = (collectionName, data, callBack) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //调用mongdb的findone方法
        collection.findOne(data , (err, doc) => {
            //关闭数据库
            client.close();
            callBack(err, doc)
        })

    })
}
//查询多个数据库封装
const findMany = (collectionName, data, callBack) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //调用mongdb的findMany方法
        collection.find(data).toArray((err, docs) => {
            //关闭数据库
            client.close();
            callBack(err, docs)
        })
    })
}

// 修改一个数据库封装
/**
 * 
 * @param {*} collectionName 集合名称
 * @param {*} condition 条件
 * @param {*} data 数据
 * @param {*} callBack 回调函数
 */

const updateOne = (collectionName,condition, data, callBack) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
      
        collection.updateOne(condition,{$set:data},(err, result) => {
            //关闭数据库
            client.close();
            callBack(err, result)
        })
    })
}

// 删除封装
const deleteOne=(collectionName,data,callBack)=>{
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
      
        collection.deleteOne(data,(err, result) => {
            //关闭数据库
            client.close();
            callBack(err, result)
        })
    })
}
//导出接口
module.exports = {
    insertSingle,
    findOne,
    findMany,
    updateOne,
    ObjectId,
    deleteOne
}