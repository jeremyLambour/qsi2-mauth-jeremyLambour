const omit = require('lodash.omit');
const { Users } = require('../model');

const createUser = ({ firstName, lastName, email, password }) =>
  Users.create({
    email,
    firstName: firstName || '',
    lastName: lastName || '',
    hash: password,
  }).then(user =>
    omit(
      user.get({
        plain: true,
      }),
      Users.excludeAttributes
    )
  );

const loginUser = ({ email, password }) =>
  Users.findOne({
    where: {
      email,
    },
  }).then(user =>
    user && !user.deletedAt
      ? Promise.all([
          omit(
            user.get({
              plain: true,
            }),
            Users.excludeAttributes
          ),
          user.comparePassword(password),
        ])
      : Promise.reject(new Error('UNKOWN OR DELETED USER'))
  );

const getUser = ({ id }) =>
  Users.findOne({
    where: {
      id,
    },
  }).then(user =>
    user && !user.deletedAt
      ? omit(
          user.get({
            plain: true,
          }),
          Users.excludeAttributes
        )
      : Promise.reject(new Error('UNKOWN OR DELETED USER'))
  );

const updateUser = ({ id, email, firstName, lastName, password }) =>
  Users.update(
    {
      email,
      firstName,
      lastName,
      hash: password,
      updatedAt: new Date(),
    },
    {
      where: {
        id,
      },
    }
  ).then(numberModifiedRows =>
    numberModifiedRows > 0 ? 'user modified' : 'user not modified'
  );

const deleteUser = ({ id }) =>
  Users.update(
    {
      deletedAt: new Date(),
    },
    {
      where: {
        id,
      },
    }
  ).then(numberModifiedRows =>
    numberModifiedRows > 0 ? 'user deleted' : 'user not deleted'
  );
module.exports = {
  createUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
};
