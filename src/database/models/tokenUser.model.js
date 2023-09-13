"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TokenUser extends Model {
   
    static associate(models) {
      // User
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  TokenUser.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ip: {
        type: DataTypes.STRING,
      },
      userAgent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TokenUser",   timestamps: true,
    }
  );
  return TokenUser;
};
