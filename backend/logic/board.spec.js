require('dotenv').config({ path: __dirname + '/../env/test.env' });
require('../model');
const { describe } = require('mocha');
const { User } = require('../model/User');
const { Board } = require('../model/Board');
const { Column } = require('../model/Column');
const assert = require('assert');
const should = require('chai').should();
const BoardCtrl = require('./board');

describe('Board logic', function () {
    let userId;
    beforeEach(done => {
        User.destroy({ where: {} })
            .then(() => User.create({
                email: "tst@tst.tst",
                password: "123"
            }))
            .then(u => {
                userId = u.get('id');
                done()
            });
    });

    describe('isCreate', function () {

        it('should return valid json', async () => {
            const name = 'BoardOne';
            const board = await BoardCtrl.createBoard({ name, userId });
            board.should.have.property('name').equal(name);
        });
    });

});