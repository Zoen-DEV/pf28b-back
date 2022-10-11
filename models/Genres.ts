import { DataTypes, Model, Sequelize } from 'sequelize'

interface GenresAttributes {
    id: number;
    name: string;
 

}

module.exports = (sequelize:any, DataTypes: any) => {
    class Genres extends Model implements GenresAttributes {
        id!: number;
        name!: string;
       


        static associate (models:any){
            Genres.belongsToMany(models.Animes, {through: 'anime_genre'})
        }
    }


    Genres.init({
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
    },{
        sequelize,
        timestamps: false, 
        modelName: "Genres"

    } )

    return Genres
}
