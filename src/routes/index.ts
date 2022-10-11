require("dotenv").config();
const { Router } = require("express");
const router = Router();
const anime = require("./animes.ts");
import animeFavorite from "./animesFavorites"
const genre = require("./genres.ts");
const topAnime = require ("./topAnimes.ts")
import manga from "./manga.routes";
import login from "./login.routes";

router.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello world");
});

router.use("/manga", manga);
router.use("/login", login);
router.use("/animes", anime);
router.use("/genres", genre);
router.use("/topAnimes", topAnime);
router.use("/animefavorites",animeFavorite)



export default router;
