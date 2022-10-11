import { Router } from "express";
import {
  getMangaById,
  getMangaGenres,
  getMangaNews,
  getMangaRecomendations,
  getMangas,
  getTopManga,
  searchByName,
} from "../controller/controllerManga";
const server = Router();

server.get("/", async (req, res) => {
  try {
    const resp = await getMangas();
    // console.log(resp.length);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

server.get("/searchmanga", async (req, res) => {
  const { name } = req.query;
  try {
    const resp = await searchByName(name);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

server.get("/genres", async (req, res) => {
  try {
    const genres = await getMangaGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

server.get("/top", async (req, res) => {
  try {
    const resp = await getTopManga();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

server.get("/recomendations", async (req, res) => {
  try {
    const resp = await getMangaRecomendations();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

server.get("/news/:id", async (req, res) => {
  try {
    const resp = await getMangaNews();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

server.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await getMangaById(id);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

export default server;
