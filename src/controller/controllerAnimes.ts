//@ts-nocheck
import axios from "axios";
import { Request, Response } from "express";
import db from "../../models";

import {Op} from 'sequelize'


// ruta animesDB---http://localhost:3000/animes--//

const getAllAnimes =async (req:Request,res:Response) => {
  
    try {
        
         const animesDB= await  db.Animes.findAll();
         res.json({animesDB})
   } catch (error) {
        
    }
    
}

//ruta name y episodes ---http://localhost:3000/animes/name?name={name}

const forNameAndEpisodes = async (req:Request,res:Response)=>{
    const {name}=req.query
    try {
      
        let animeInfo :any=[]
    
        const info = await axios.get(`https://api.jikan.moe/v4/anime?q=${name}`);
        info.data.data.map((a:any)=>{
            animeInfo.push({

        id:a.mal_id,
        title: a.title,
        image:a.images.jpg.image_url,
        trailer:a.url,
        type:a.type,
        release:a.string,
        rating:a.score === null? 2.34:a.score,
        description:a.synopsis,
        popularity:a.popularity,
        producers:a.producers.map((p:any)=>p.name),
        genres:a.genres.map((g:any)=>g.name),
        price:a.score +20
    }) 
    
    })
 res.send(animeInfo)
    

        
      } catch (error) {
        
      }
}

const getAnimeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const animeById = await db.Animes.findOne({ where: { id: id } });
      res.send(animeById);
    } catch (err) {
      throw new Error(err);
    }
  };

module.exports = {
  getAnimeById,
  forNameAndEpisodes,
  getAllAnimes
}