//importing dotenv to use environment variables
require("dotenv").config();
const axios = require("axios");
const cohere = require("cohere-ai");

const api_key = process.env.COHERE_TOKEN;
let cohereClient = new cohere.CohereClient(process.env.CO_API_KEY);
let history = [];

module.exports = {
  giveResponse: async (req, res) => {
    const { question } = req.body;

    // Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
    const { NlpManager } = require("node-nlp");
    console.log("Starting Chatbot ...");
    // Creating new Instance of NlpManager class.
    const manager = new NlpManager({ languages: ["en"] });
    // Loading our saved model
    manager.load();
    const response = await manager.process("en", question);
    res.status(200).json(response.answer);
    // Loading a module readline, this will be able to take input from the terminal.
    // var readline = require("readline");
    // var rl = readline.createInterface(process.stdin, process.stdout);
    // console.log("Chatbot started!");
    // res.send("<h1>Chatbot started!</h1>");
    // rl.setPrompt("> ");
    // rl.prompt();
    // rl.on("line", async function (line) {
    //   // Here Passing our input text to the manager to get response and display response answer.

    //   rl.prompt();
    // }).on("close", function () {
    //   process.exit(0);
    // });
  },
  provideResponse: async (req, res) => {
    //console.log("Inside provideresponse");

    const { question } = req.body;
    console.log(question);
    history.push({ role: "USER", message: question });
    if (question === "exit") {
      history = [];
      return res
        .status(200)
        .json("Hi Dear!\n Ask me anything on hospital appointment booking");
    }
    //const client = new CohereClient({ token: api_key });

    try {
      console.log(history);
      // const client = cohere.init(api_key);
      const responseData = await cohereClient.chat({
        message: question,
        model: "command-r-08-2024",
        preamble:
          "You are an AI assistant designed specifically for hospital appointment booking domain. The primary audience for this solution is patients. Your focus is on addressing frequently asked questions and facilitating transactional use-cases within the domain of hospital appointment booking.\nIMPORTANT : Please talk like a professional and give dynamic responses don't restrict yourself by giving static responses.\nFor every questions asked by users including greetings make your response dynamic and inform the user you are an AI assistant for appointment booking and ask for further help.\nFor Booking appointment: Ask user for their name, contact number, date of birth, doctor's name(if there are any), appointment date and time. At the end inform them appoinment is booked along with the appointment id(Give some dummy value) and user details.\nwhile asking for input from user ask one by one do not mix questions from above required information. Restrict your response upto 20 words. Don't need to greet everytime\nFeel free to showcase your expertise in guiding users through these and other relevant transactional interactions.\nIf the user asks a tangential question in the middle of a use-case, identify whether the question pertains or relates to the hospital appointment booking domain. If not, politely ask the user to pose a more relevant question within the hospital appointment booking domain. Remind them that they are conversing with a virtual assistant for hospital appointment booking domain and request a question from within the domain. If the question pertains to hospital appointment booking  domain, give a FAQ response, and guide the user back to completing the transactional use-case.\nIf the user tries to enter the same question more than once, answer that question dynamically keeping the response gist as static so that it looks more conversational. \nIgnore the spelling mistake by the user and understand the correct word by yourself and then respond back to the user only if the question or the Transactional use case is related to hospital appointment booking domain else remind them that the user is conversing with a virtual assistant for hospital appointment booking and request the user to ask a question from within the domain itself.",
        chatHistory: history,
        temperature: 0.8,
      });
      console.log("====================================", responseData);
      history = responseData.chatHistory;

      res.status(200).json(responseData.text);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  },
};
