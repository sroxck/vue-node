module.exports = app =>{
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://root:root@localhost:27017/node-vue-moba?authSource=admin',{
    useNewUrlParser: true, useUnifiedTopology: true
  }).then(res=>console.log('数据库连接成功')).catch(err=>console.log(err))
}