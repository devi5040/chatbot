const Router = require("express").Router();
const chatbotController = require("../controller/chatbot_controller");

Router.post("/chatbot-response", chatbotController.provideResponse);
module.exports = Router;
