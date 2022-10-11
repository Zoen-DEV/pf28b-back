import { DataTypes, UUIDV1, Model, Sequelize, STRING } from 'sequelize'

interface AnimeAttributes {
  id: number;
  title: string;
  image: string;
  trailer: string;
  release: string,
  rating: number;
  description: string;
  producers:string;
  popularity:number;
  genres:string
  price: number;
  
 
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Animes extends Model implements AnimeAttributes {
    id!: number;
    title!: string;
    image!: string;
    trailer!: string;
    release!: string;
    rating!: number;
    description!: string;
    producers!:string;
    popularity!:number;
    genres!:string
    price!: number;

    static associate(models: any) {
       Animes.belongsToMany(models.Genres, { through: 'anime_genre' })
      Animes.belongsToMany(models.Purchases, { through: 'purchase_anime' })

     
    }
  }
  Animes.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
     
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    trailer: {
      type: DataTypes.STRING,
    },
    release: {
      type: DataTypes.DATEONLY,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    description:{
      type:DataTypes.TEXT,
  
    },
    producers: {
      type: DataTypes.ARRAY(DataTypes.STRING)

    },
    popularity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING)

    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  
  }, {
    sequelize,
    timestamps: false,
    modelName: "Animes"
  })
  return Animes
}