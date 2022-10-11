const {Router} = require ("express");
const animes = require("../controller/ControllerAnimes")

const router = Router();



router.get("/",
animes.getAllAnimes
);

router.get("/name", 
animes.forNameAndEpisodes
 
    
)

router.get('/:id', 
animes.getAnimeById
)

module.exports= router
