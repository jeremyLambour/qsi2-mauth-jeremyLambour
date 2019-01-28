module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    idPost: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      comment: 'Post ID',
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Post title',
      set(value) {
        this.setDataValue('title', value);
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Post content',
      set(value) {
        this.setDataValue('content', value);
      },
    },
  });
  Posts.associate = models => {
    Posts.belongsTo(models.Users, { as: 'postUserId' });
    Posts.belongsTo(models.Groups, { as: 'postGroupId' });
  };

  return Posts;
};
