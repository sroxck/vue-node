const express = require('express')
// 导入express框架
const app = express()
app.use(require('cors')())
app.use(express.json())
// 静态文件托管
app.use('/uploads',express.static(__dirname +'/uploads'))

// admin 后台前端页面静态文件
app.use('/admin',express.static(__dirname +'/admin'))

// 前端官网页面静态文件
app.use('/',express.static(__dirname +'/web'))

// 创建服务器
require('./plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)
app.get('/',function(req, res) {
  res.send('nih2ao')
})
app.listen(3000,()=>{
  console.log('服务器启动成功');
})
// 监听3030端口