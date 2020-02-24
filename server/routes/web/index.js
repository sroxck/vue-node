module.exports = app => {
  const router = require("express").Router(); // 引入路由
  app.use("/web/api", router);

  const mongoose = require("mongoose"); // 引入mongoose
  const Article = mongoose.model("Article"); // 引入集合构造函数
  const Category = mongoose.model("Category"); //同上
  //导入新闻数据
  router.get("/news/init", async (req, res) => {
    //路由
    const parent = await Category.findOne({ name: "新闻分类" }); //查询出新闻分类
    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean(); // 查询出新闻分类下面的子分类
    // 文章标题
    const newsTitle = [
      "体验服爆料丨穿上新盔甲，守护玄雍城！白起优化曝光",
      "情人节限定皮肤爆料丨喜鹊筑桥，嫦娥后羿月下相逢",
      "觉醒之战即将再度开启！鬼谷子全屏大，露娜无限连",
      "新皮肤爆料丨AI意识觉醒，机器少女妲己绚丽登场！",
      "王者荣耀祝各位召唤师春节快乐！",
      "峡谷来相聚 初春有好礼",
      "创意互动营-云中君皮肤设计大赛投票开启",
      "爱在峡谷携手度 甜蜜好礼轻松得",
      "元宵福利到 峡谷好热闹！",
      "妲己新皮肤即将上架 全新好礼不容错过！",
      "《王者荣耀职业联赛（KPL）线上赛规则（暂行）》",
      "王者荣耀世界冠军杯总决赛落地首都北京",
      "2020年《王者荣耀》职业赛事（KPL与KPLGT）春季赛开赛调整公告",
      "中国电竞小伙逐梦记",
      "2019年赛事数据盘点，峡谷最强选手全知道！"
    ];
    // 把查询出的新闻子分类 打乱 然后 循环标题 每一个标题都返回一个对象
    //形式{title=title 然后对象中加入分类 分类是随机的2个新闻下面的子分类}
    //最终返回形式 [{categories:{活动,公告},title:体验服爆料}]
    const newsList = newsTitle.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        categories: randomCats.slice(0, 2),
        title: title
      };
    });
    await Article.deleteMany({});
    await Article.insertMany(newsList);
    res.send(newsList);
  });
  //导入新闻列表
  router.get("/news/list", async (req, res) => {
    // const parent = await Category.findOne({//通过新闻分类的children找到子分类 在通过子分类的populate查找里面关联的
    //   name:'新闻分类'
    // }).populate({
    //   path:'children',
    //   populate:{
    //     path:'newsList'
    //   }
    // }).lean()
    const parent = await Category.findOne({ name: "新闻分类" });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        }
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] }
        }
      }
    ]);
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate("categories")
        .limit(5)
        .lean()
    });
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });
    res.send(cats);
  });
  const Hero = mongoose.model("Hero");
  //导入英雄数据
  router.get("/hero/init", async (req, res) => {
    await Hero.deleteMany({})
    const rawData = [
      {
        name: "热门",
        heroes: [
          {
            name: "后羿",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
          },
          {
            name: "韩信",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
          },
          {
            name: "铠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "孙悟空",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
          },
          {
            name: "亚瑟",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "安琪拉",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
          },
          {
            name: "鲁班七号",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
          },
          {
            name: "妲己",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
          },
          {
            name: "甄姬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
          },
          {
            name: "庄周",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
          }
        ]
      },
      {
        name: "战士",
        heroes: [
          {
            name: "赵云",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
          },
          {
            name: "墨子",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
          },
          {
            name: "钟无艳",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
          },
          {
            name: "吕布",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
          },
          {
            name: "夏侯惇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
          },
          {
            name: "曹操",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
          },
          {
            name: "典韦",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
          },
          {
            name: "宫本武藏",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
          },
          {
            name: "达摩",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
          },
          {
            name: "老夫子",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
          },
          {
            name: "关羽",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
          },
          {
            name: "程咬金",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
          },
          {
            name: "露娜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
          },
          {
            name: "花木兰",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
          },
          {
            name: "橘右京",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
          },
          {
            name: "亚瑟",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "孙悟空",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
          },
          {
            name: "刘备",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
          },
          {
            name: "钟馗",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
          },
          {
            name: "杨戬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
          },
          {
            name: "雅典娜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
          },
          {
            name: "哪吒",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
          },
          {
            name: "铠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "苏烈",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
          },
          {
            name: "裴擒虎",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
          },
          {
            name: "狂铁",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
          },
          {
            name: "孙策",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
          },
          {
            name: "李信",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
          },
          {
            name: "盘古",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
          },
          {
            name: "云中君",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
          },
          {
            name: "曜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"
          },
          {
            name: "马超",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
          }
        ]
      },
      {
        name: "法师",
        heroes: [
          {
            name: "小乔",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
          },
          {
            name: "墨子",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
          },
          {
            name: "妲己",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
          },
          {
            name: "嬴政",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
          },
          {
            name: "高渐离",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
          },
          {
            name: "孙膑",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
          },
          {
            name: "扁鹊",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
          },
          {
            name: "芈月",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
          },
          {
            name: "周瑜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
          },
          {
            name: "甄姬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
          },
          {
            name: "武则天",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
          },
          {
            name: "貂蝉",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
          },
          {
            name: "安琪拉",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
          },
          {
            name: "露娜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
          },
          {
            name: "姜子牙",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
          },
          {
            name: "王昭君",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
          },
          {
            name: "张良",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
          },
          {
            name: "不知火舞",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
          },
          {
            name: "钟馗",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
          },
          {
            name: "诸葛亮",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
          },
          {
            name: "干将莫邪",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
          },
          {
            name: "女娲",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
          },
          {
            name: "杨玉环",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
          },
          {
            name: "弈星",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
          },
          {
            name: "米莱狄",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
          },
          {
            name: "司马懿",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
          },
          {
            name: "沈梦溪",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
          },
          {
            name: "上官婉儿",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
          },
          {
            name: "嫦娥",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
          },
          {
            name: "西施",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"
          }
        ]
      },
      {
        name: "坦克",
        heroes: [
          {
            name: "廉颇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
          },
          {
            name: "庄周",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
          },
          {
            name: "刘禅",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
          },
          {
            name: "钟无艳",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
          },
          {
            name: "白起",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
          },
          {
            name: "芈月",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
          },
          {
            name: "吕布",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
          },
          {
            name: "夏侯惇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
          },
          {
            name: "达摩",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
          },
          {
            name: "项羽",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
          },
          {
            name: "程咬金",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
          },
          {
            name: "刘邦",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
          },
          {
            name: "亚瑟",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "牛魔",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
          },
          {
            name: "张飞",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
          },
          {
            name: "太乙真人",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
          },
          {
            name: "东皇太一",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
          },
          {
            name: "铠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "苏烈",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
          },
          {
            name: "梦奇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
          },
          {
            name: "孙策",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
          },
          {
            name: "嫦娥",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
          },
          {
            name: "猪八戒",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
          }
        ]
      },
      {
        name: "刺客",
        heroes: [
          {
            name: "铠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "苏烈",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
          },
          {
            name: "梦奇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
          },
          {
            name: "孙策",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
          },
          {
            name: "嫦娥",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
          },
          {
            name: "猪八戒",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
          }
        ]
      },
      {
        name: "射手",
        heroes: [
          {
            name: "铠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "苏烈",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
          },
          {
            name: "梦奇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
          },
          {
            name: "孙策",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
          },
          {
            name: "嫦娥",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
          },
          {
            name: "猪八戒",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
          }
        ]
      },
      {
        name: "辅助",
        heroes: [
          {
            name: "钟无艳",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
          },
          {
            name: "白起",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
          },
          {
            name: "芈月",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
          },
          {
            name: "吕布",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
          },
          {
            name: "夏侯惇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
          }
        ]
      }
    ];
    for(let cat of rawData) {
      if(cat.name ==='热门') {
        continue 
      }
      const category = await Category.findOne({name:cat.name})
      cat.heroes = cat.heroes.map(item=>{
        item.categories = [category]
        return item
      })
      //录入英雄
      await Hero.insertMany(cat.heroes)
    }
    res.send(await Hero.find())
  });
//英雄列表接口
  router.get("/hero/list", async (req, res) => {
   
    const parent = await Category.findOne({ name: "英雄分类" });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "heroes",
          localField: "_id",
          foreignField: "categories",
          as: "heroList"
        }
      }
    ]);
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      heroList: await Hero.find()
        .where({
          categories: { $in: subCats }
        })
        .limit(10)
        .lean()
    });
  
    res.send(cats);
  });

// 文章详情
  router.get('/articles/:id', async (req,res)=>{
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories:{$in:data.categories}
    }).limit(3)
    res.send(data)
  })

  // 英雄详情
  router.get('/heroes/:id', async (req,res)=>{
    const data = await  Hero.findById(req.params.id).populate('categories partners.hero items1 items2').lean()
    res.send(data)
  })
};
