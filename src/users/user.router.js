const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

userRouter.post(
  "/register",
  userController.validateCreateUser,
  userController.createUser
);
userRouter.put(
  "/auth-login",
  userController.validateAuthLogin,
  userController.authLogin
);

// userRouter.put(
//   "/auth-logout",
//   userController.authorize,
//   userController.validateID,
//   userController.authLogout,
// );

userRouter.get(
  "/auth-current",
  userController.authorize,
  userController.getCurrentUser
);

module.exports = userRouter;
