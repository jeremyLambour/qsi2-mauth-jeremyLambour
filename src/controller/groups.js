const { Groups } = require('../model');

const createGroup = ({ title, description, GroupAdmin }) => {
  Groups.create({
    title,
    description,
    GroupAdmin,
  });
};

module.exports = {
  createGroup,
};
