"use strict";
import { Model, UUIDV1 } from "sequelize";

interface PurchasesAttributes {
  id: number;
  totalPrice: number;
  amount: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Purchases
    extends Model<PurchasesAttributes>
    implements PurchasesAttributes
  {
    id!: number;
    totalPrice!: number;
    amount!: number;

    static associate(models: any) {
      // define association here
      Purchases.belongsToMany(models.Manga, { through: "purchase_manga" });
      Purchases.belongsToMany(models.Animes, { through: "purchase_anime" });
      Purchases.belongsTo(models.Users, {foreignKey: "userId"})

    }
  }
  Purchases.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV1,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Purchases",
    }
  );
  return Purchases;
};
