// 导出的一个方法 该方法获取注册页面
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
//导入第三方包验证码
const captchapng = require('captchapng')

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'twzcc';
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}
//导出注册方法
exports.register = (req, res) => {
    const result = {
        status: 0,
        message: "注册成功"
    }
    //1.拿到浏览器传输过来的数据
    const {
        username
    } = req.body
    // console.log(username)
    //2.先判断数据库中用户名 是否存在 如果存在就提示
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('accountInfo');
        //查询一个
        collection.findOne({
            username
        }, (err, docs) => {
            console.log(docs);

            //如果result==null没用查询到 就可以插入 如果查询到了 说明用户已经存在
            if (docs) {
                //存在
                result.status = 1;
                result.message = "用户名已经存在"
                //返回
                res.json(result)
                //关闭数据库
                client.close();

            } else {
                //3.如果用户名不存在就存在数据库中
                collection.insertOne(req.body, (err, result2) => {
                    if (!result2) {
                        //失败
                        result.status = 2;
                        result.message = "注册失败"
                    }
                    //返回
                    res.json(result)
                    //关闭数据库
                    client.close();

                })
            }

        })

    })
}
//导出登录的方法
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/login.html"))
}
//导出获取验证码的方法
exports.getVcodeImage = (req, res) => {
    const vcode = (parseInt(Math.random() * 9000 + 1000));
    req.session.vcode = vcode
    console.log(req.session.vcode)
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//导出登录的方法
exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登录成功'
    }
    // 把浏览器传递过来的验证码 和 req.session.vcode 中的验证码对比
    const {
        username,
        password,
        vcode
    } = req.body
    //判断验证码
    if (vcode != req.session.vcode) {
        result.status = 1,
            result.message = "验证码错误"
        //返回数据
        res.json(result)
        return
    }
    //验证码通过后还要验证用户名和密码
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('accountInfo');
        //查询一个
        collection.findOne({
            username,
            password
        }, (err, docs) => {
            console.log(docs);

            //如果result==null没用查询到 就可以插入 如果查询到了 说明用户已经存在
            if (docs) {
                //存在
                result.status = 2;
                result.message = "用户名或密码错误"
            }
            //关闭数据库
            client.close();
            res.json(result)
        })

    })

}