"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../../utils/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // TokenUser
      this.hasOne(models.TokenUser, {
        foreignKey: "userId",
      });

      
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "client"],
        defaultValue: "client",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifiedDate: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      verificationToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      passwordToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      passwordTokenExpire: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
