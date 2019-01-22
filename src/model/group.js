const User = require('./users');

module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    idGroup: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      comment: ' Group ID',
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Group title',
      set(value) {
        this.setDataValue('title', value);
      },
    },
    description: {
      type: DataTypes.STRING,
      comment: 'Group description',
      set(value) {
        this.setDataValue('description', value);
      },
    },
    metadatas: {
      type: DataTypes.JON,
      comment: 'Group metadatas',
      set(value) {
        this.setDataValue('metadatas', value);
      },
    },
  });

  Groups.belongsToMany(User, { through: 'UserGroups' });
  Groups.hasOne(User, { as: 'GroupAdmin' });
  return Groups;
};
