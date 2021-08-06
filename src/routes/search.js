const Router = require("express").Router;
const Bot = require("../controllers/Bot");

const botRouter = Router();
botRouter.post("/incoming", Bot.search);

module.exports = botRouter;
