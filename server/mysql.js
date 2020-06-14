function mysql(sql, sucCallback, errCallback) {
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'test'
    });
    connection.connect()
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[ERROR] - ', err.message);
            errCallback(err)
            return;
        }
        sucCallback(result)
        connection.end();
    });
}

module.exports = mysql
