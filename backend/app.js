const env = {
    dev: './env/development.env',
    prod: './env/production.env'
};

require('dotenv').config({ path: env[process.env.NODE_ENV] });
require('./model');
require('./preconfig/passport');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());

const routers = require('./rest');

routers.forEach(router => {
    app.use('/api', router);
});

app.listen(process.env.PORT);
console.log('Backend: listen on port', process.env.PORT);