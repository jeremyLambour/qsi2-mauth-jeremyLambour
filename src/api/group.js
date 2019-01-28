const express = require('express');

const logger = require('../logger.js');
const {
  createGroup,
  addGroupMember,
  listGroups,
  removeGroupMember,
} = require('../controller/groups');

const apiGroupsProtected = express.Router();

apiGroupsProtected.post('/', (req, res) =>
  !req.body.title || !req.body.GroupAdmin
    ? res.status(400).send({
        success: false,
        message: 'title and group admin is required',
      })
    : createGroup(req.body)
        .then(group => {
          res.status(201).send({
            success: true,
            profile: group,
            message: 'group succesfully created',
          });
        })
        .catch(err => {
          logger.error(`💥 Failed to create new group : ${err.stack}`);
          return res.status(500).send({
            success: false,
            message: `${err.name} : ${err.message}`,
          });
        })
);
apiGroupsProtected.post('/member', (req, res) =>
  !req.body.groupId && !req.body.userId
    ? res.status(400).send({
        success: false,
        message: 'userId and groupId are required to add a new member',
      })
    : addGroupMember(req.body)
        .then(() => {
          res.status(201).send({
            success: true,
            message: `user ${req.body.userId} succesfully joined group ${
              req.body.groupId
            }`,
          });
        })
        .catch(err => {
          logger.error(`💥 Failed to add new member : ${err.stack}`);
          return res.status(500).send({
            success: false,
            message: `${err.name} : ${err.message}`,
          });
        })
);

apiGroupsProtected.delete('/member', (req, res) =>
  !req.body.groupId && !req.body.userId
    ? res.status(400).send({
        success: false,
        message: 'userId and groupId are required to add a new member',
      })
    : removeGroupMember(req.body)
        .then(() => {
          res.status(201).send({
            success: true,
            message: `user ${
              req.body.userId
            } succesfully deleted from the group ${req.body.groupId}`,
          });
        })
        .catch(err => {
          logger.error(`💥 Failed to delete member in group : ${err.stack}`);
          return res.status(500).send({
            success: false,
            message: `${err.name} : ${err.message}`,
          });
        })
);

apiGroupsProtected.get('/', (req, res) =>
  listGroups()
    .then(groups => {
      res.status(201).send({
        success: true,
        profile: groups,
        message: 'list of groups',
      });
    })
    .catch(err => {
      logger.error(`💥 Failed to get a list of all groups : ${err.stack}`);
      return res.status(500).send({
        success: false,
        message: `${err.name} : ${err.message}`,
      });
    })
);

module.exports = { apiGroupsProtected };
