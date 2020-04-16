const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("./user.model");

const { UnauthorizedError } = require("../helpers/errorConstructor");

class UserController {
  constructor() {
    this._costFactor = 4;
  }
  get createUser() {
    return this._createUser.bind(this);
  }
  // get getCurrentUser() {
  //   return this._getCurrentUser.bind(this);
  // }
  async _createUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const passwordHash = await bcryptjs.hash(password, this._costFactor);

      const user = await userModel.create({
        username,
        email,
        password: passwordHash,
      });

      return res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      // res.status(400).json('user exist');
      next(err);
    }
  }
  validateCreateUser(req, res, next) {
    const validationRules = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const validationResult = Joi.validate(req.body, validationRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  }

  async authLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!user || !isPasswordValid) {
        return res
          .status(401)
          .send("Faild to login, check your email or password");
      }

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 2 * 24 * 60 * 60, // two days
      });
      await userModel.updateToken(user._id, token);

      return res.status(200).json({ token });
    } catch (err) {
      next();
    }
  }

  validateAuthLogin(req, res, next) {
    const validationRules = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const validationResult = Joi.validate(req.body, validationRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  }
  async authLogout(req, res, next) {
    try {
      const user = req.user;
      await user.updateToken(user._id, null);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async authorize(req, res, next) {
    try {
      // 1. витягнути токен користувача з заголовка Authorization
      const authorizationHeader = req.get("Authorization");
      const token = authorizationHeader.replace("Bearer ", "");
      if (!token) return;
      // 2. витягнути id користувача з пейлоада або вернути користувачу
      // помилку зі статус кодом 401
      let userId;
      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET).id;
      } catch (err) {
        // console.log("err", err);

        next(new UnauthorizedError("User not authorized1"));
      }
      // 3. витягнути відповідного користувача. Якщо такого немає - викинути
      // помилку зі статус кодом 401
      // userModel - модель користувача в нашій системі
      // const user = await userModel.findOne({ email });
      const user = await userModel.findById(userId, function (err, userData) {
        if (err) return err;
        return userData;
      });

      if (!user) {
        throw new UnauthorizedError("User not authorized2");
      }

      // 4. Якщо все пройшло успішно - передати запис користувача і токен в req
      // і передати обробку запиту на наступний middleware
      req.user = user;
      // req.token = token;

      next();
    } catch (err) {
      next(err);
    }
  }
  async getCurrentUser(res, req, next) {
    // console.log(req.req.user);
    return res.res
      .status(200)
      .json({ username: req.req.user.username, email: req.req.user.email });
  }
}

module.exports = new UserController();
