require("dotenv").config();
import axios from "axios";
import db from "../../models";

export const getMangas = async () => {
  // let allMangas = [];
  const mangasDb = await db.Manga.findAll();
  if (!mangasDb.length) {
    const url = "https://api.jikan.moe/v4/manga/";
    const url2 = "https://api.jikan.moe/v4/manga?page=2";
    const url3 = "https://api.jikan.moe/v4/manga?page=3";
    const url4 = "https://api.jikan.moe/v4/manga?page=4";

    const response = await axios.get(url);
    const response2 = await axios.get(url2);
    const response3 = await axios.get(url3);
    const response4 = await axios.get(url4);

    //it's necesary call to the API four times to get all the 100 mangas information

    const callOne = response.data.data.map(
      (d: {
        [x: string]: any;
        genres: any;
        mal_id: any;
        synopsis: any;
        status: any;
        chapters: any;
        popularity: any;
        score: any;
        images: any;
        titles: {
          filter(arg0: (d: any) => boolean): any;
          map(arg0: (d: any) => any): unknown;
          title: any;
        };
        price: number;
      }) => {
        return {
          // id: d.mal_id,
          title: d.titles
            .filter((d) => d.type === "Default")
            .map((d: { title: any }) => d.title)
            .join(" "),
          image: d.images.jpg.large_image_url,
          score: d.score !== null ? d.score : 5,
          popularity: d.popularity,
          chapters: d.chapters !== null ? d.chapters : 100,
          status: d.status,
          synopsis: d.synopsis,
          genres: d.genres
            .map((d: { name: any; type: any }) => d.name)
            .join(", "),
          price: 4.99
        };
      }
    );

    const callTwo = response2.data.data.map(
      (d: {
        [x: string]: any;
        genres: any;
        mal_id: any;
        synopsis: any;
        status: any;
        chapters: any;
        popularity: any;
        score: any;
        images: any;
        titles: {
          filter(arg0: (d: any) => boolean): any;
          map(arg0: (d: any) => any): unknown;
          title: any;
        };
        price: number;
      }) => {
        return {
          // id: d.mal_id,
          title: d.titles
            .filter((d) => d.type === "Default")
            .map((d: { title: any }) => d.title)
            .join(" "),
          image: d.images.jpg.large_image_url,
          score: d.score !== null ? d.score : 5,
          popularity: d.popularity,
          chapters: d.chapters !== null ? d.chapters : 100,
          status: d.status,
          synopsis: d.synopsis,
          genres: d.genres
            .map((d: { name: any; type: any }) => d.name)
            .join(", "),
            price: 4.99
        };
      }
    );

    const callTree = response3.data.data.map(
      (d: {
        [x: string]: any;
        genres: any;
        mal_id: any;
        synopsis: any;
        status: any;
        chapters: any;
        popularity: any;
        score: any;
        images: any;
        titles: {
          filter(arg0: (d: any) => boolean): any;
          map(arg0: (d: any) => any): unknown;
          title: any;
        };
        price: number;
      }) => {
        return {
          // id: d.mal_id,
          title: d.titles
            .filter((d) => d.type === "Default")
            .map((d: { title: any }) => d.title)
            .join(" "),
          image: d.images.jpg.large_image_url,
          score: d.score !== null ? d.score : 5,
          popularity: d.popularity,
          chapters: d.chapters !== null ? d.chapters : 100,
          status: d.status,
          synopsis: d.synopsis,
          genres: d.genres
            .map((d: { name: any; type: any }) => d.name)
            .join(", "),
            price: 4.99
        };
      }
    );

    const callFour = response4.data.data.map(
      (d: {
        [x: string]: any;
        genres: any;
        mal_id: any;
        synopsis: any;
        status: any;
        chapters: any;
        popularity: any;
        score: any;
        images: any;
        titles: {
          filter(arg0: (d: any) => boolean): any;
          map(arg0: (d: any) => any): unknown;
          title: any;
        };
        price: number;
      }) => {
        return {
          // id: d.mal_id,
          title: d.titles
            .filter((d) => d.type === "Default")
            .map((d: { title: any }) => d.title)
            .join(" "),
          image: d.images.jpg.large_image_url,
          score: d.score !== null ? d.score : 5.0,
          popularity: d.popularity,
          chapters: d.chapters !== null ? d.chapters : 100,
          status: d.status,
          synopsis: d.synopsis,
          genres: d.genres
            .map((d: { name: any; type: any }) => d.name)
            .join(", "),
            price: 4.99
        };
      }
    );

    let allMangas = [...callOne, ...callTwo, ...callTree, ...callFour];

    //mangas are created into de DB
    const mangas = await db.Manga.bulkCreate(allMangas);

    return mangas;
  }
  //if the information already exists  whitin the DB then returns it
  else return mangasDb;
};

export const getMangaGenres = async () => {
  const url = "https://api.jikan.moe/v4/genres/manga";
  const genres = db.GenresManga.findAll();
  //if genres it doesn't exists in DB it serach them and then it create into DB, else return only the DB genres
  if (!genres.length) {
    const response = await axios(url);
    const genre = response.data.data.map(
      (d: { [x: string]: any; name: any }) => {
        return {
          id: d.mal_id,
          name: d.name,
        };
      }
    );
    await db.GenresManga.bulkCreate(genre);
    return genre;
  } else return genres;
};

export const getMangaById = async (id: any) => {
  const url = `https://api.jikan.moe/v4/manga/${id}`;

  if (id.length > 10) {
    const mangaDb = await db.Manga.findByPk(id);
    return mangaDb;
  } else {
    const response = await axios.get(url);
    const d = response.data.data;
    const manga = {
      id: d.mal_id,
      title: d.titles
        .filter((d: { type: string }) => d.type === "Default")
        .map((d: { title: any }) => d.title)
        .join(" "),
      image: d.images.jpg.large_image_url,
      score: d.score !== null ? d.score : 5,
      popularity: d.popularity,
      chapters: d.chapters !== null ? d.chapters : 100,
      status: d.status,
      synopsis: d.synopsis,
      genres: d.genres.map((d: { name: any; type: any }) => d.name).join(", "),
      price: 4.99,
    };
    return manga;
  }
};

//this function brings 25 top mangas
export const getTopManga = async () => {
  const url = "https://api.jikan.moe/v4/top/manga";
  const response = await axios.get(url);
  return response.data.data.map(
    (d: {
      [x: string]: any;
      genres: any;
      mal_id: any;
      synopsis: any;
      status: any;
      chapters: any;
      popularity: any;
      score: any;
      images: any;
      titles: {
        filter(arg0: (d: any) => boolean): any;
        map(arg0: (d: any) => any): unknown;
        title: any;
      };
      price: number;
    }) => {
      return {
        id: d.mal_id,
        title: d.titles
          .filter((d) => d.type === "Default")
          .map((d: { title: any }) => d.title)
          .join(" "),
        image: d.images.jpg.large_image_url,
        score: d.score !== null ? d.score : 5,
        popularity: d.popularity,
        chapters: d.chapters !== null ? d.chapters : 100,

        status: d.status,
        synopsis: d.synopsis,
        genres: d.genres
          .map((d: { name: any; type: any }) => d.name)
          .join(", "),
          price: 4.99,
      };
    }
  );
};

//this function brings 10 manga news
export const getMangaNews = async (id: number = 1) => {
  const url = `https://api.jikan.moe/v4/manga/${id}/news`;
  const response = await axios.get(url);

  const news = response.data.data.map(
    (d: {
      title: any;
      date: any;
      author_username: any;
      images: { jpg: { image_url: any } };
      excerpt: any;
    }) => {
      return {
        title: d.title,
        date: d.date,
        author: d.author_username,
        image: d.images.jpg.image_url,
        comment: d.excerpt,
      };
    }
  );

  return news;
};

export const getMangaRecomendations = async () => {
  const url = "https://api.jikan.moe/v4/manga/1/recommendations";
  const response = await axios.get(url);
  const recomendations = response.data.data.map(
    (d: {
      entry: { title: any; images: { jpg: { large_image_url: any } } };
      votes: any;
    }) => {
      return {
        title: d.entry.title,
        image: d.entry.images.jpg.large_image_url,
        votes: d.votes,
      };
    }
  );
  return recomendations;
};

//Brings the first ten mangas with the name
export const searchByName = async (name: any) => {
  const url = `https://api.jikan.moe/v4/manga?q=${name}&limit=10`;
  // const mangasDb = await db.Manga.findAll({
  //   where: {
  //     name,
  //   },
  // });
  // if (!mangasDb) {
  const response = await axios.get(url);
  const mangas = response.data.data.map(
    (d: {
      mal_id: any;
      titles: any[];
      images: { jpg: { large_image_url: any } };
      score: null;
      popularity: any;
      chapters: null;
      status: any;
      synopsis: any;
      genres: { name: any; type: any }[];
      price: number;
    }) => {
      return {
        id: d.mal_id,
        title: d.titles
          .filter((d: { type: string }) => d.type === "Default")
          .map((d: { title: any }) => d.title)
          .join(" "),
        image: d.images.jpg.large_image_url,
        score: d.score !== null ? d.score : 5,
        popularity: d.popularity,
        chapters: d.chapters !== null ? d.chapters : 100,
        status: d.status,
        synopsis: d.synopsis,
        genres: d.genres
          .map((d: { name: any; type: any }) => d.name)
          .join(", "),
        price: 4.99
         
      };
    }
  );
  return mangas;
  // } else {
  //   return mangasDb;
  // }
};

export const createManga = async (obj: {}) => {};
