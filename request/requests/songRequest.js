function songRequest(app, mongo, jsonParser) {
    const getSongs = require('../../server/songs/getSongs')

    //Songs
    app.get('/getSongs', (req, res) => {
        res.send(getSongs())
    })

    //getGrade
    app.post('/getGrade', jsonParser, (req, res) => {
        mongo(dbo => {
            dbo.collection("user").find({ "id": req.session.userId }).toArray((err, data) => {
                data = data[0]
                const grade = data["grades"][req.body.name]
                if (grade) {
                    res.send(grade)
                    return
                }
                res.send(false)
            })
        })
    })

    //submitGrade
    app.post('/submitGrade', jsonParser, (req, res) => {
        mongo(dbo => {
            const query = { "id": req.session.userId }
            const newObj = {
                "$set": {
                    [`grades.${req.body.name}`]: {
                        "great": req.body.great,
                        "good": req.body.good,
                        "miss": req.body.miss
                    }
                }
            }
            dbo.collection("user").updateOne(query, newObj, { upsert: true }, (err, result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(result)
                }
            })
        })
    })
}

module.exports = songRequest