var db = require('sqlite-sync');
db.connect('sigo.db');

function newCompany(code, description, speciality) {
    db.insert("companies", { code, description, speciality });
}

function companies() {
    const list = db.run("SELECT code, description, speciality FROM companies order by code ", {});
    return list
}

function auth(username, password) {
    const list = db.run("SELECT * FROM users where username = ? and password = ?", [username, password]);
    return list.length > 0
}

module.exports = { newCompany, companies, auth }