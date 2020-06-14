//引包
const express = require('express')
const history = require('connect-history-api-fallback');
const session = require('express-session')

//创建服务器应用程序
//相当于http.createServer
const app = express()
//设置端口
const port = 3000


//session使用
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

//history模式
app.use(history())      // 这里千万要注意，要在static静态资源上面
app.use(express.static('./dist'));

//引入Request
//在vue里使用前端路由，所以后端只需要操作请求即可
const getRequests = require('./request/getRequests')
getRequests(app)

app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`))