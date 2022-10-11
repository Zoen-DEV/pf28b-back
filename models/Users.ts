"use strict";
import { UUIDV4, Model } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  image: string;
  email: string;
  password: string;
  cellphone: number;
  isActive: boolean;
  isAdmin: boolean;
  google: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    username!: string;
    image!: string;
    email!: string;
    password!: string;
    cellphone!: number;
    isActive!: boolean;
    isAdmin!: boolean;
    google!: boolean;
    static associate(models: any) {
      // define association here
      Users.belongsToMany(models.AnimeFavorites, { through: "anime_favorite" });
      Users.hasMany(models.Purchases);
      // Users.hasOne(models.Profile);
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cellphone: {
        type: DataTypes.CHAR,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Users",
    }
  );
  return Users;
};
