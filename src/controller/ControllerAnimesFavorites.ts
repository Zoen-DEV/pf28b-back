import axios from "axios"
import { Request, Response } from "express";
import db from "../../models";

import {Op} from 'sequelize'


// ruta createAnimeFavorites---http://localhost:3000/animeFavorites----//


export const createAnimeFavorite= async (obj: any) => {
    
    const { title,image,trailer,release,rating,description,producers,popularity,genres,price,user } = obj;

    const exists= await db.AnimeFavorites.findOne({ where: { title: title } });
    if (exists) return ({ Info: "Anime already exists" });
   
 const fv = await db.AnimeFavorites.create({ title,image,trailer,release,rating,description,producers,popularity,genres,price });

    user.forEach(async (element:any) => {
      const found = await db.Users.findByPk(element);
      fv?.addUser([found]);
  });
  
   

  
    return fv;
  };