const { Groups } = require('../model');

const createGroup = ({ title, description, GroupAdmin, metadatas }) =>
  Groups.create({
    title,
    description,
    GroupAdminId: GroupAdmin,
    metadatas,
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
module.exports = {
  createGroup,
  addGroupMember,
  listGroups,
  removeGroupMember,
};
