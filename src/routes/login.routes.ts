import { Router } from "express";
import db from "../../models";
import isAdminRole from "../../middlewares/validateRoles";
const auth = require("../../middlewares/auth");
const user = require("../controller/controllerUsers");
import {
  signUp,
  getAllUsers,
  getUserEmail,
  signIn,
  googleSignIn,
} from "../controller/controllerUsers";
const server = Router();

server.post("/bulk", async (req, res) => {
  const users = await db.Users.bulkCreate(req.body);
  res.send(users);
});

server.post("/", async (req, res) => {
  const { username, email, pass } = req.body;
  // console.log(req.body);

  const google = false;
  const image =
    "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6";

  try {
    const newUser = await signUp({ username, email, pass, google, image });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ msg: "something went wrong", error });
  }
});

server.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const resp = await signIn({ email, password });
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

server.post("/auth/google", async (req, res) => {
  const { id_token } = req.body;
  try {
    const newUser = await googleSignIn(id_token);
    // console.log(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong", error });
  }
});

server.get("/users", auth, isAdminRole, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong", error });
  }
});

server.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserEmail(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: "Something went  wrong" });
  }
});

server.put("/:email", user.putUser);

server.delete("/:email", user.deleteUser);

export default server;
