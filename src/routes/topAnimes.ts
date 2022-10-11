import {Router} from "express"

const topAnimes = require("../controller/controllerTopAnimes")

const router = Router();



router.get("/",
topAnimes.getTopAnimes
);



module.exports= router