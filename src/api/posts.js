const express = require('express');

const logger = require('../logger.js');
const { createPost, listAllPostsForAGroup } = require('../controller/posts');

const apiPostProtected = express.Router();

apiPostProtected.post('/', (req, res) =>
  !req.body.title ||
  !req.body.content ||
  !req.body.postUserId ||
  !req.body.postGroupId
    ? res.status(400).send({
        success: false,
        message:
          'title, content, userId and group id are required to create a post',
      })
    : createPost(req.body)
        .then(post => {
          res.status(201).send({
            success: true,
            profile: post,
            message: 'post succesfully created',
          });
        })
        .catch(err => {
          logger.error(`💥 Failed to create new post : ${err.stack}`);
          return res.status(500).send({
            success: false,
            message: `${err.name} : ${err.message}`,
          });
        })
);

apiPostProtected.get('/', (req, res) => {
  listAllPostsForAGroup({
    groupId: req.query.idGroup,
    userId: req.query.idUser,
  })
    .then(posts => {
      res.status(201).send({
        success: true,
        profile: posts,
        message: 'list of all post',
      });
    })
    .catch(err => {
      logger.error(`💥 Failed to get a list of all posts : ${err.stack}`);
      return res.status(500).send({
        success: false,
        message: `${err.name} : ${err.message}`,
      });
    });
});

module.exports = { apiPostProtected };
