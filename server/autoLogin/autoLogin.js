function autoLogin(req) {  
    const cookieStr = req.headers.cookie;
    const start = cookieStr.indexOf('userId')
    if (start === -1) {
        res.send(false)
        return
    }
    cookieArr = cookieStr.slice(start).split('=')
    const userId = cookieArr[1]
    req.session.id = userId
}

module.exports = autoLogin
