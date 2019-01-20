// 导出的一个方法 该方法获取注册页面
const path=require('path')
exports.getRegisterPage=(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'../public/views/register.html')))
}