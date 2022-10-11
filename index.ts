import db from "./models";
import axios from "axios";
import app from "./app";
// import { anime } from "./seeders/anime";

async function getAnimes() {
  try {
    let url = `https://api.jikan.moe/v4/anime`;
    let url2 = `https://api.jikan.moe/v4/anime?page=2`;
    let url3 = `https://api.jikan.moe/v4/anime?page=3`;
    let url4 = `https://api.jikan.moe/v4/anime?page=4`;

    let animes: any = [];
    try {
      const resApi = await axios.get(`${url2}`);
      const resApi2 = await axios.get(`${url}`);
      const resApi3 = await axios.get(`${url3}`);
      const resApi4 = await axios.get(`${url4}`);
      resApi.data.data.map((a: any) => {
        animes.push({
          title: a.title,
          image: a.images.jpg.image_url,
          trailer: a.url,
          type: a.type,
          release: a.string,
          rating: a.score,
          description: a.synopsis,
          popularity: a.popularity,
          producers: a.producers.map((p: any) => p.name),
          genres: a.genres.map((g: any) => g.name),
          price: a.score + 30,
        });
      });
      resApi2.data.data.map((a: any) => {
        animes.push({
          title: a.title,
          image: a.images.jpg.image_url,
          trailer: a.url,
          type: a.type,
          release: a.string,
          rating: a.score,
          description: a.synopsis,
          popularity: a.popularity,
          producers: a.producers.map((p: any) => p.name),
          genres: a.genres.map((g: any) => g.name),
          price: a.score + 30,
        });
      });

      resApi3.data.data.map((a: any) => {
        animes.push({
          title: a.title,
          image: a.images.jpg.image_url,
          trailer: a.url,
          type: a.type,
          release: a.string,
          rating: a.score,
          description: a.synopsis,
          popularity: a.popularity,
          producers: a.producers.map((p: any) => p.name),
          genres: a.genres.map((g: any) => g.name),
          price: a.score + 30,
        });
      });
      resApi4.data.data.map((a: any) => {
        animes.push({
          title: a.title,
          image: a.images.jpg.image_url,
          trailer: a.url,
          type: a.type,
          release: a.string,
          rating: a.score,
          description: a.synopsis,
          popularity: a.popularity,
          producers: a.producers.map((p: any) => p.name),
          genres: a.genres.map((g: any) => g.name),
          price: a.score + 30,
        });
      });
      console.log('animes')
      await db.Animes.bulkCreate(animes);

      return { msg: "Anime Creados en db" };
    } catch (error) {}
    console.log("Todos los Animes se han cargado correctamente");
  } catch (e) {
    console.log(e);
  }
}

function preCarga() {
  axios.get(`https://api.jikan.moe/v4/genres/anime`).then((res) => {
    let resApi = res.data.data.map((G: any) => {
      const obj = {
        name: G.name,
      };
      return obj;
    });
    db.Genres.bulkCreate(resApi);
    return { msg: "Genres Creados en db" };
  });
}

async function preCargaTopAnimes() {
  let top: any = [];
  let api = await axios.get(`https://api.jikan.moe/v4/top/anime`);
  api.data.data.map((G: any) => {
    top.push({
      title: G.title,
      image: G.images.jpg.image_url,
      trailer: G.url,
      type: G.type,
      release: G.string,
      rating: G.score,
      description: G.synopsis,
      popularity: G.popularity,
      producers: G.producers.map((p: any) => p.name),
      genres: G.genres.map((g: any) => g.name),
      price: G.score + 30,
    });
  });
  await db.TopAnimes.bulkCreate(top);
  return { msg: "TopAnimes Creados en db" };
}

preCarga();
getAnimes();
preCargaTopAnimes();

const port = process.env.PORT || 3000;

db.sequelize.sync({ force: true }).then(async () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
