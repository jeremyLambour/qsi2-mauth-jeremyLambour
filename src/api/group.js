const express = require('express');
const { createGroup } = require('../controller/groups');

const apiGroupsProtected = express.Router();

apiGroupsProtected.post('/', (req, res) =>
  !req.body.title || !req.body.GroupAdmin
    ? res.status(400).send({
        success: false,
        message: 'title and group admin is required',
      })
    : createGroup(req.body).then(group => {
        res.status(400).send({
          success: false,
          groups: group,
          message: 'group succesfully created',
        });
      })
);
module.exports = { apiGroupsProtected };
