function loginRequest(app, mongo, jsonParser) {
    app.post('/login', jsonParser, function (req, res) {
        mongo(dbo => {
            dbo.collection("user").find({ "id": req.body.id }).toArray((err, data) => {
                user = data[0]
                if (req.body.id == user.id && req.body.passWord == user.password) {
                    req.session.userId = user.id
                    req.session.author = user.author
                    res.cookie('userId', req.body.id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
        })
    })

    app.get('/quit', (req, res) => {
        req.session.destroy();
        res.cookie('userId', "", { maxAge: 0 })
        res.send(true)
    })
}

module.exports = loginRequest