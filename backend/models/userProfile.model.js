const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserProfile = sequelize.define('UserProfile', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activityLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bmr: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tdee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calorieTarget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    proteinTarget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carbsTarget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fatsTarget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return UserProfile;
};
