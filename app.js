const path = require('path');
const koa = require('koa');
const app = new koa();
const koaStatic = require('koa-static')
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const screenShotController = require('./controllers/screenShot')

app.use(koaStatic(path.join(__dirname, './public'))) // 将 public 文件夹作为静态资源服务

router.post('/screenshot', screenShotController.htmlToImage)

app.use(cors());// 处理跨域
app.use(bodyParser());
app.use(router.routes());

app.listen(3001, () => {
  console.log('启动成功')
  console.log('http://localhost:3001')
});
