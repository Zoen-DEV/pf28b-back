"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
  class MangasFavorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  MangasFavorites.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MangasFavorites",
    }
  );
  return MangasFavorites;
};
