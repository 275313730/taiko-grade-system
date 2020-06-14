const authorList = require('./authorList.json')

function author(req) {
    let level = 0
    for (let u of authorList) {
        if (u.url == req.body.url) {
            level = u.level
        }
    }
    if (req.session.author >= level) {
        return true
    } else {
        return false
    }
}

module.exports = author