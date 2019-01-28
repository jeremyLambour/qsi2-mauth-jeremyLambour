const { Groups } = require('../model');
const logger = require('../logger');

const createGroup = ({ title, description, GroupAdmin, metadatas }) =>
  Groups.create({
    title,
    description,
    GroupAdminId: GroupAdmin,
    metadatas,
  }).then(group => {
    group.addUser(GroupAdmin);
    return group;
  });

const listGroups = () => Groups.findAll();

const addGroupMember = ({ groupId, userId }) =>
  Groups.findOne({
    where: { idGroup: groupId },
  }).then(group =>
    group ? group.addUser(userId) : Promise.reject(new Error('Group not found'))
  );

const removeGroupMember = ({ groupId, userId }) =>
  Groups.findOne({
    where: { idGroup: groupId },
  }).then(group =>
    group
      ? group.removeUser(userId)
      : Promise.reject(new Error('Group not found'))
  );

const isGroupMember = ({ groupId, userId }) =>
  Groups.findOne({
    where: { idGroup: groupId },
  }).then(group => group.hasUser(userId));
module.exports = {
  createGroup,
  addGroupMember,
  listGroups,
  removeGroupMember,
  isGroupMember,
};
