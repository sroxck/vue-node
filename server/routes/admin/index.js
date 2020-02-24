module.exports = app => {
  // 在这里可以使用app
  // 导入express框架,创建一级路由
  const express = require("express");
  const path = require("path");
  const assert = require('http-assert')
  const router = express.Router({
    mergeParams: true
  });
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')

  // 添加分类的接口
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  // 编辑分类的接口
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 获取分类的接口
  router.get("/",async (req, res) => {
    let queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const catelist = await req.Model.find()
      .setOptions(queryOptions)
      .limit(100);
    res.send(catelist);
  });
  // 删除分类的接口
  router.delete("/:id", async (req, res) => {
    const catelist = await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({ success: true });
  });
  // 获取详情页的接口
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
 
// 登录授权中间件
  const auth =  async(req,res,next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token,401,'请提供twtken')
    const {id} = jwt.verify(token,app.get('secret'))
    assert(id,401,'无效token')

    req.user = await AdminUser.findById(id)
    assert(req.user,401,'请先登录')
    await next()
  }
  // 使用二级路由配置admin/api地址
  app.use(
    "/admin/api/rest/:resource",auth,async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );

  // 文件上传处理
  const multer = require("multer");
app.set('secret','adgadgkadgag34w3wf3jf2')//设置app下面一个变量 值为随机字符串 然后用于token的秘钥验证
  const upload = multer({ dest: path.join(__dirname, "/../../uploads") });
  app.post("/admin/api/upload", auth,upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });
  // 登录接口
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 根据用户名查找用户
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user,422,'用户不存在')
   
    // 校验密码
    const isValid = require('bcryptjs').compareSync(password,user.password)
    assert(isValid,422,'密码错误')
    
    // 返回token
    const token = jwt.sign({ id:user._id},app.get('secret'))
    res.send({token:token})
  });
  // 错误处理中间件
  app.use(async (err,req,res,next)=>{
    res.status(err.statusCode || 500).send({
      message:err.message
    })
  })
};
