const express = require('express')
const HomeRouter = require('./router/HomeRouter')
const LoginRouter = require('./router/LoginRouter')

const app = express()

// 配置模板引擎
app.set("views", "./views")
app.set("view engine", "ejs")
// app.set("view engine", "html")
// app.engine('html', require('ejs').renderFile) // 支持直接渲染html 文件

// 配置静态资源
app.use(express.static('public'))

// 配置解析post参数-内置的
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// 应用级别
app.use((req, res, next) => {
    console.log('验证token')
    next()
})

app.use("/home", HomeRouter)
app.use("/login", LoginRouter)

app.get(/.*y$/, (req, res) => {
    res.send('ok')
})

app.use((req, res) => {
    res.status(404).send('文件不存在')
})

app.listen(3000, () => {
    console.log('server is running')
})

/* 
<% %> 流程控制语句
        <%= %> 输出 text文本
        <%- %> 输出 html
        <%# %> 注释
        <%- include('user/show',{user.user}) %> 导入公共的模板内容
*/