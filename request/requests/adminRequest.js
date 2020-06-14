function adminRequest(app, mongo, jsonParser) {
    //查
    app.get('/get', (req, res) => {
        mongo(db => {
            const dbo = db.db("user")
            const data = dbo.collection("user").find()
            res.send(data)
        }, err => {
            res.send(err)
        })
    })

    //增
    app.post('/add', jsonParser, (req, res) => {
        mongo(db => {
            const dbo = db.db("user")
            const col = dbo.collection("user")
            col.insertOne({ id: req.body.id})
            mongo(`CREATE TABLE ${req.body.id} LIKE admin;`,
                data => {
                    console.log(data)
                }, err => {
                    console.log(err)
                })
            res.send(data)
        }, err => {
            res.send(err)
        })
    })

    //删
    app.post('/del', jsonParser, (req, res) => {
        mongo(`DELETE FROM user WHERE id='${req.body.id}';`,
            data => {
                mongo(`DROP TABLE ${req.body.id};`,
                    data => {
                        console.log(data)
                    }, err => {
                        console.log(err)
                    })
                res.send(data)
            }, err => {
                res.send(err)
            })
    })

    //改
    app.post('/update', jsonParser, (req, res) => {
        mongo(`UPDATE user SET password="${req.body.password}",author="${req.body.author}" WHERE id='${req.body.id}';`,
            data => {
                res.send(data)
            }, err => {
                res.send(err)
            })
    })
}

module.exports = adminRequest