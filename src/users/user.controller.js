class UserController {
  constructor() {
    this._costFactor = 4;
  }

  getUserWorld(req, res, next) {
    return res.send("Hello world");
  }
  validateUser(req, res, next) {}
}

module.exports = new UserController();
