const { Posts } = require('../model');
const { isGroupMember } = require('./groups');

const createPost = ({ title, content, postUserId, postGroupId }) =>
  isGroupMember({ groupId: postGroupId, userId: postUserId })
    ? Posts.create({
        title,
        content,
        postUserIdId: postUserId,
        postGroupIdIdGroup: postGroupId,
      })
    : Promise.reject(
        new Error(
          'Unable to create a post because user is not a member of this group'
        )
      );

const listAllPostsForAGroup = ({ groupId, userId }) =>
  isGroupMember({ groupId, userId }).then(result =>
    result
      ? Posts.findAll()
      : Promise.reject(
          new Error(
            'Unable to get a list of all post of this group cause user is not a member'
          )
        )
  );

module.exports = {
  createPost,
  listAllPostsForAGroup,
};
