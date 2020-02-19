module.exports = app => {
  // 在这里可以使用app
  // 导入express框架,创建一级路由
  const express = require("express");
  const path = require('path')
  const router = express.Router({
    mergeParams: true
  });

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
  router.get("/", async (req, res) => {
    let queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const catelist = await req.Model.find()
      .setOptions(queryOptions)
      .limit(10);
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
  // 使用二级路由配置admin/api地址
  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
  
  // 文件上传处理
  const multer = require("multer");
  
  const upload = multer({ dest: path.join(__dirname , "/../../uploads" )});
  app.post("/admin/api/upload", upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

};
