const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    const user = await newUser.save();
    // console.log(user);
    user.hash_password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({
      message: error,
    });
  }
};

const sign_in = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !user.comparePassword(req.body.password)) {
      res.status(401).json({
        message: "Authentication failed. Invalid user or password.",
      });
    }
    res.json({
      token: jwt.sign(
        { email: user.email, fullName: user.fullName, _id: user._id },
        "RESTFULAPIs"
      ),
    });
  } catch (error) {
    res.status(error.code || 500).json(error);
  }
};

const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

const profile = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  profile,
  loginRequired,
  sign_in,
  register,
};
