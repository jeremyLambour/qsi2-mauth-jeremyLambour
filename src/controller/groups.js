const { Groups } = require('../model');

const createGroup = ({ title, description, GroupAdmin }) =>
  Groups.create({
    title,
    description,
    GroupAdmin,
  });
const listGroups = () => Groups.findAll();
const addGroupMember = ({ groupId, userId }) => {};
const removeGroupMember = ({ groupId, userId }) => {};
module.exports = {
  createGroup,
  addGroupMember,
  listGroups,
  removeGroupMember,
};
