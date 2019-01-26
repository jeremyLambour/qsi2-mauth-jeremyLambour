const express = require('express');
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
    : createGroup(req.body).then(group => {
        res.status(201).send({
          success: true,
          profile: group,
          message: 'group succesfully created',
        });
      })
);
apiGroupsProtected.post('/member', (req, res) =>
  !req.body.groupId && !req.body.userId
    ? res.status(400).send({
        success: false,
        message: 'userId and groupId are required to add a new member',
      })
    : addGroupMember(req.body).then(groupMember => {
        res.status(201).send({
          success: true,
          message: `user${groupMember.userId}succesfully joined group${
            groupMember.groupIdGroup
          }`,
        });
      })
);

apiGroupsProtected.delete('/member', (req, res) =>
  !req.body.groupId && !req.body.userId
    ? res.status(400).send({
        success: false,
        message: 'userId and groupId are required to add a new member',
      })
    : removeGroupMember(req.body).then(groupMember => {
        res.status(201).send({
          success: true,
          message: `user${groupMember.userId}succesfully joined group${
            groupMember.groupIdGroup
          }`,
        });
      })
);

apiGroupsProtected.get('/', (req, res) =>
  listGroups().then(groups => {
    res.status(201).send({
      success: true,
      profile: groups,
      message: 'list of groups',
    });
  })
);

module.exports = { apiGroupsProtected };
