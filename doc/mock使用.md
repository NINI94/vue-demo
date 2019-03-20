# 在vue-cli中使用mockjs
[参考链接](https://juejin.im/post/5acdb5345188255c5668caa5)
```
//我们使用axios来发起http请求
npm install axios --save
//安装依赖mockjs
npm install mockjs --save-dev
```

在项目根路径下创建mock文件夹
```
- mock 
    - index.js
    - userInfo.json
    - util.js
```

index.js 文件
```
const Mock = require('mockjs');//mockjs 导入依赖模块
const util = require('./util');//自定义工具模块
//返回一个函数
module.exports = function(app){
    //监听http请求
    app.get('/user/userinfo', function (rep, res) {
        //每次响应请求时读取mock data的json文件
        //util.getJsonFile方法定义了如何读取json文件并解析成数据对象
        var json = util.getJsonFile('./userInfo.json');
        //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
        res.json(Mock.mock(json));
    });
}
```


util.js
```
const fs = require('fs');//引入文件系统模块
const path = require('path');//引入path模块

module.exports = {
    //读取json文件
    getJsonFile:function (filePath) {
        //读取指定json文件
        var json = fs.readFileSync(path.resolve(__dirname,filePath), 'utf-8');
        //解析并返回
        return JSON.parse(json);
    }
};
```

userInfo.json
```
{
    "error":0,
    "data":{
        "userid": "@id()",
        "username": "@cname()",        
        "date": "@date()",
        "avatar": "@image('200x200','red','#fff','avatar')",
        "description": "@paragraph()",
        "ip": "@ip()",
        "email": "@email()"
    }
}
```

在路径build/webpack.dev.conf.js文件中的devServer属性中新添加一个before钩子函数,用来监听来自web的http请求
```
devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
        rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
        ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    before: require('../mock'),//引入mock/index.js
    watchOptions: {
        poll: config.dev.poll,
    }
},
```

### 浏览器发起请求，获取mock data
在App.vue文件中使用axios发起http请求
```
export default {
  name: 'App',
  data(){
    return {
      userInfo:{}
    }
  },
  created(){
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
     //请求'/user/userinfo'接口
      this.$axios.get('/user/userinfo')
      .then(({data})=>{
        //打印mock data
        console.log(data);
        if(data.error === 0){
          this.userInfo = data.data;
        }else{
          this.userInfo = {};
        }
        
      });
    }
  }
}
```