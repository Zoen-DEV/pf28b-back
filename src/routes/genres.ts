import {Router} from "express"

const genres = require("../controller/ControllerGenres")

const router = Router();



router.get("/",
genres.getAllGenres
);

module.exports= router