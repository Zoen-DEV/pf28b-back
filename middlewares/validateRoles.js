const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  console.log(req.user);
  if (!req.user) {
    return res.status(500).json({
      msg: "Is require to verify the rol without validate the token first",
    });
  }

  const { isAdmin, username } = req.user;
  console.log({ isAdmin, username });

  if (!isAdmin) {
    return res
      .status(401)
      .json({ msg: `${username} is not the administrator` });
  }

  next();
};

module.exports = isAdminRole;
