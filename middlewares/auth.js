require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_WORD;
const { response, request } = require("express");
import db from "../models";
const auth = async (req = request, res = response, next) => {
  console.log(req.headers);

  //check if exists the token
  if (!req.headers.token) {
    res.status(401).json({ msg: "Access not autorized" });
  } else {
    //check the validation of the token
    const token = req.headers.token

    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        // console.log(err);
        res.status(500).json({ msg: "The session has expired, you must be logged", err });

      } else {
        const user = await db.Users.findByPk(decoded.user.id);
        // console.log({user});

        if (!user) {
          return res
            .status(401)
            .json({ msg: "Invalid token - user delete on DB" });
        }

        if (!user.isActive) {
          return res
            .status(401)
            .json({ msg: "Invalid token - user with state active false" });
        }

        req.user = user;

        next();
      }
    });
  }
};

module.exports = auth;
