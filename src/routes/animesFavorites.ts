import {Router} from "express"
import {
  createAnimeFavorite
    
  } from "../controller/ControllerAnimesFavorites";

const server = Router();



server.post("/", async (req, res) => {
    
    const {  title,image,trailer,release,rating,description,producers,popularity,genres,price,user } = req.body;
    try {
      const newUser = await createAnimeFavorite({  title,image,trailer,release,rating,description,producers,popularity,genres,price,user });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ msg: "Something went wrong", error });
    }
  });



  export default server;