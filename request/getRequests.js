function getRequests(app) {
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017";
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();

    function mongo(cb) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            const dbo = db.db("user")
            cb(dbo)
            db.close();
        });
    }

    const loginRequest = require('./requests/loginRequest');
    loginRequest(app, mongo, jsonParser);

    const registerRequest = require('./requests/registerRequest');
    registerRequest(app, mongo, jsonParser);

    const songRequest = require('./requests/songRequest');
    songRequest(app, mongo, jsonParser);

    const adminRequest = require('./requests/adminRequest');
    adminRequest(app, mongo, jsonParser);

    const commonRequest = require('./requests/commonRequest');
    commonRequest(app, jsonParser);
}

module.exports = getRequests