const fs = require('fs');
module.exports =
    fs.readdirSync(__dirname)
        .filter(i => i !== 'index.js')
        .map(i => require(__dirname + '/' + i));