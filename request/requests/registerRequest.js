function registerRequest(app, mongo, jsonParser) {
    const email = require('../../server/email')

    app.post('/getVCode', jsonParser, function (req, res) {
        mongo(dbo => {
            dbo.collection("user").find({ "id": req.body.id }).toArray((err, data) => {
                data = data[0]
                if (data) {
                    res.send('昵称已存在')
                    return
                }

                let number = Math.round(Math.random() * 10000)
                req.session.vCode = number
                req.session.email = req.body.email
                email(req.body.email, number.toString())
                res.send('验证码已发送')
            })
        })
    })

    app.post('/register', jsonParser, function (req, res) {
        mongo(dbo => {
            if (req.body.email == req.session.email && req.body.vCode == req.session.vCode) {
                dbo.collection("user").insertOne({
                    "id": req.body.id,
                    "email": req.body.email,
                    "password": req.body.passWord,
                    "author": 1,
                    "grades": {}
                }, (err, result) => {
                    if (err) throw err
                    res.send(true)
                })
            } else {
                res.send('验证码或邮箱错误')
            }
        })
    })
}

module.exports = registerRequest