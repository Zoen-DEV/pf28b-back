"use strict";
import { Model } from "sequelize";

interface GenresAttributes {
  id: number;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class GenresManga
    extends Model<GenresAttributes>
    implements GenresAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    static associate(models: any) {
      // define association here
    }
  }
  GenresManga.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "GenresManga",
    }
  );
  return GenresManga;
};
