require("dotenv").config();
import { googleVerify } from "../../helpers/google-verify";
import db from "../../models";
import { Request, response, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = Number(process.env.SALT_ROUNDS);
const secret = process.env.SECRET_WORD;
const salt = bcrypt.genSaltSync(saltRounds);

export const signUp = async (obj: any) => {
  const { username, email, pass, image, google } = obj;
  let isAdmin = false;

  if (!username || !email || !pass)
    throw "Missing data require to create a new user";

  if (
    email === "Jhojangutierrez900@gmail.com" ||
    email === "xdarcx@hotmail.es" ||
    email === "p.manolaki95@gmail.com" ||
    email === "sam.caillat@gmail.com" ||
    email === "enzoholgadocdb@gmail.com"
  ) {
    isAdmin = true;
  }

  const userExist = await db.Users.findOne({ where: { username } });
  const emailExist = await db.Users.findOne({ where: { email } });
  // const userGoogle = await db.Users.findOne({ where: { email } });
  if (userExist === null && emailExist === null) {
    const password = bcrypt.hashSync(pass, salt);
    const user = await db.Users.create({
      username,
      email,
      password,
      isAdmin,
      image,
      google,
    });

    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });

    return { user, token, msg: "you have successfully registered" };
  } else if (userExist === null && emailExist.google === true) {
    throw "you need to log in with google, your count already exists";
  } else if (userExist === null && emailExist)
    throw "this email is already registered";
  else if (userExist) throw "This username is not available";
};

export const signIn = async (obj: any) => {
  const { email, password } = obj;
  const user = await db.Users.findOne({
    where: { email },
  });

  // if(!user.isActive) {
  //   throw 'talk to admin, user blocked'
  // }
  if (!user) {
    throw "User with this email not found";
  } else if (!user.isActive) {
    throw "talk to admin, user blocked";
  } else {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
      return { msg: "The user has been authenticated", user, token };
    } else {
      throw "Invalid password!!";
    }
  }
};

export const getAllUsers = async () => {
  const allUsers = await db.Users.findAll({
    include: { model: db.AnimeFavorites },
  });
  return allUsers;
};

export const getUserEmail = async (email: any) => {
  const user = await db.Users.findOne({
    where: { email },
    include: { model: db.AnimeFavorites },
  });
  return user;
};

export const googleSignIn = async (id_token: string) => {
  if (id_token) {
    let isAdmin = false;
    try {
      const googleUser = await googleVerify(id_token);
      const { name, picture, email } = googleUser;

      // console.log(email);
      if (
        email === "Jhojangutierrez900@gmail.com" ||
        email === "xdarcx@hotmail.es" ||
        email === "p.manolaki95@gmail.com" ||
        email === "sam.caillat@gmail.com" ||
        email === "enzoholgadocdb@gmail.com"
      ) {
        isAdmin = true;
      }

      let user = await db.Users.findOne({ where: { email } });

      if (!user) {
        let data = {
          username: name,
          email,
          image: picture,
          pass: ":p",
          google: true,
          isAdmin,
        };
        await db.Users.create(data);
        user = await db.Users.findOne({ where: { email } });
      }
      if (!user.isActive) {
        throw "talk to admin, user blocked";
      }

      const token = jwt.sign({ user }, secret, { expiresIn: "1h" });

      return {
        msg: "user authenticated successfully with Google",
        user,
        token,
      };
    } catch (error) {
      return { msg: "token cannot be verified", error };
    }
  } else return { msg: "id_token is necessary" };
};

///-----ruta putUser http://localhost:3000/login/${email}

exports.putUser = async (req: Request, res: Response) => {
  try {
    let email = req.params.email;
    let { username, image, cellphone } = req.body;
    let resDB = await db.Users.update(
      { username, image, cellphone },
      {
        where: {
          email,
        },
      }
    );

    res.send("hola");
  } catch (error) {
    res.status(400).send("User not update!!");
  }
};

///-----ruta deleteUser http://localhost:3000/login/${email}

exports.deleteUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    await db.Users.destroy({
      where: {
        email,
      },
    });
    res.send({ info: "User deleted!!" });
  } catch (error) {
    res.send({ error: "Can`t delete User" });
  }
};
