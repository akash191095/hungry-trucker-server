import jwt from "jsonwebtoken";
import { User } from "../resources/user/user.model";

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRECT, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRECT, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    res.cookie("token", token, { httpOnly: true });
    return res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  const invalid = { message: "Invalid email and password combination" };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    res.cookie("token", token, { httpOnly: true });

    const fullUser = await User.findById(user._id)
      .select("-password")
      .lean()
      .exec();

    return res.status(201).send(fullUser);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export async function checkAuth(req, res) {
  if (req.user) return res.send(req.user);
  return res.status(401).send("Not authenticated");
}

export const protect = async (req, res, next) => {
  const bearer = req.cookies.token;

  let payload;
  try {
    payload = await verifyToken(bearer);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
