function commonRequest(app, jsonParser) {
    const author = require('../../server/author/author')
    app.post('/getAuthor', jsonParser, (req, res) => {
        if (!req.session.author) {
            req.session.author = 0
        }
        res.send(author(req))
    })

    //test
    app.post('/post', (req, res) => {
        res.send('Post Success!')
    })
}

module.exports = commonRequest


