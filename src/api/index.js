const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const enforce = require('express-sslify');
const cors = require('cors');
const { apiUsers, apiUsersProtected } = require('./users');
const { isAuthenticated, initAuth } = require('../controller/auth');
const { apiGroupsProtected } = require('./group');
const { apiPostProtected } = require('./posts');

const corsOptions = {
  origin: process.env.ORIGIN || 'http://localhost:1234',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// create an express Application for our api
const api = express();
initAuth();
// apply a middelware to parse application/json body
api.use(express.json({ limit: '1mb' }));
api.use(helmet());
api.use(hpp());
api.use(cors(corsOptions));
// api.use(enforce.HTTPS({ trustProtoHeader: true }));
// create an express router that will be mount at the root of the api
const apiRoutes = express.Router();
apiRoutes
  .get('/', (req, res) =>
    res.status(200).send({ message: 'hello from my api' })
  )
  .use('/users', apiUsers)
  .use(isAuthenticated)
  .use('/users', apiUsersProtected)
  .use('/groups', apiGroupsProtected)
  .use('/posts', apiPostProtected)
  .use((err, req, res, next) => {
    res.status(403).send({
      success: false,
      message: `${err.name} : ${err.message}`,
    });
    next();
  });

// root of our API will be http://localhost:5000/api/v1
api.use('/api/v1', apiRoutes);
module.exports = api;
