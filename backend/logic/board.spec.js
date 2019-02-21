require('../test/base');
const { describe } = require('mocha');
const { User } = require('../model/User');
const { Board } = require('../model/Board');
const { Column } = require('../model/Column');
const BoardCtrl = require('./board');
const assert = require('assert');
const should = require('chai').should();

describe('Board logic', function () {
    let userId;
    beforeEach(done => {
        User.create({
            email: "tst@tst.tst",
            password: "123"
        })
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
    describe('isRemove', function () {
        it('should return valid json', async () => {
            const name = 'BoardOne0';
            await BoardCtrl.createBoard({ name, userId });
            const board = await BoardCtrl.deleteBoard({ name, userId });
            board.should.equal(0);
        });
    });
});