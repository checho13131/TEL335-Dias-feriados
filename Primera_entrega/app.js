const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path')
const render = require('koa-ejs');

const app = new Koa();
const router = new KoaRouter();

//json middleware
app.use(json());
//middleware example
//app.use(async ctx => (ctx.body = { msg: 'Hello World'}));

render(app,{
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

//Routes
router.get('/', index)
router.get('/pose', showPose )

async function index(ctx) {
    await ctx.render('index');
}

async function showPose(ctx) {
    await ctx.render('pose');
}

router.get('/test', ctx => (ctx.body = 'Hello test'));
//Router middleware
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('Server Started....'))
