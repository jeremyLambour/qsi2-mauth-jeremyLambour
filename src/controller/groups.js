const { Groups } = require('../model');

const createGroup = ({ title, description, GroupAdmin }) =>
  Groups.create({
    title,
    description,
    GroupAdminId: GroupAdmin,
  });
const listGroups = () => Groups.findAll();
const addGroupMember = ({ groupId, userId }) =>
  Groups.findOne({
    where: { idGroup: groupId },
  }).then(group => {
    group.addUser(userId);
  });
const removeGroupMember = ({ groupId, userId }) =>
  Groups.findOne({
    where: { idGroup: groupId },
  }).then(group => {
    group.removeUser(userId);
  });
module.exports = {
  createGroup,
  addGroupMember,
  listGroups,
  removeGroupMember,
};
