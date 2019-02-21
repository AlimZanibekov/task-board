require('dotenv').config({ path: __dirname + '/../env/test.env' });
const { beforeEach } = require('mocha');
const db = require('../db');
require('../model');
beforeEach((done) => {
    db.sync()
        .then(() => db.drop())
        .then(() => db.sync())
        .then(() => done());
});