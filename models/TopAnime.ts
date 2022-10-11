import { DataTypes, UUIDV1, Model, Sequelize, STRING } from 'sequelize'

interface TopAnimeAttributes {
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
  class TopAnimes extends Model implements TopAnimeAttributes {
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
     //  TopAnimes.belongsToMany(models.Genres, { through: 'anime_genre' })
     
    }
  }
  TopAnimes.init({
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
    modelName: "TopAnimes"
  })
  return TopAnimes
}