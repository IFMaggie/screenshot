const koa = require('koa');
const app = new koa();
const puppeteer = require('puppeteer');

async function htmlToImageFn({
                               width = 375,
                               height = 750,
                               quality = 80,
                               fullPage = false,
                               protocol = '',
                               url = '',
                               html
                             }) {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width,
    height,
    quality,
    fullPage
  });

  await page.setContent(html)

  //获取页面Dom对象
  let body = await page.$('body');

  //调用页面内Dom对象的 screenshot 方法进行截图
  await body.screenshot({path: 'public/images/8.png'});
  await browser.close();
}

module.exports.htmlToImage = async (ctx) => {
  const {width, height, quality, env, fullPage, protocol, url, html} = ctx.request.body;
  await htmlToImageFn({width, height, quality, env, fullPage, protocol, url, html});
  ctx.body = {
    data: {url: `${ctx.origin}/images/8.png`},
    code: 200,
    message: '成功~'
  }
}
