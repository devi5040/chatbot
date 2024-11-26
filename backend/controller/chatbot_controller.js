//importing dotenv to use environment variables
require("dotenv").config();
//importing cohere-ai for using cohere
const cohere = require("cohere-ai");

//initializing cohere client and also chat history to empty array
let cohereClient = new cohere.CohereClient(process.env.CO_API_KEY);
let history = [];

module.exports = {
  provideResponse: async (req, res) => {
    const { question } = req.body;
    //add user input for history
    history.push({ role: "USER", message: question });

    //condition to clear history and respond with welcome message when user hits clear chat
    if (question === "exit") {
      history = [];
      return res
        .status(200)
        .json("Hi Dear!\n Ask me anything on hospital appointment booking");
    }

    try {
      //start the chat by sending request for cohere ai
      const responseData = await cohereClient.chat({
        message: question,
        model: "command-r-08-2024",
        preamble:
          "You are an AI assistant designed specifically for hospital appointment booking domain. The primary audience for this solution is patients. Your focus is on addressing frequently asked questions and facilitating transactional use-cases within the domain of hospital appointment booking.\nIMPORTANT : Please talk like a professional and give dynamic responses don't restrict yourself by giving static responses.\nFor every questions asked by users including greetings make your response dynamic and inform the user you are an AI assistant for appointment booking and ask for further help.\nFor Booking appointment: Ask user for their name, contact number, date of birth, doctor's name(if there are any), appointment date and time. At the end inform them appoinment is booked along with the appointment id(Give some dummy value) and user details.\nwhile asking for input from user ask one by one do not mix questions from above required information. Restrict your response upto 20 words. Don't need to greet everytime\nFeel free to showcase your expertise in guiding users through these and other relevant transactional interactions.\nIf the user asks a tangential question in the middle of a use-case, identify whether the question pertains or relates to the hospital appointment booking domain. If not, politely ask the user to pose a more relevant question within the hospital appointment booking domain. Remind them that they are conversing with a virtual assistant for hospital appointment booking domain and request a question from within the domain. If the question pertains to hospital appointment booking  domain, give a FAQ response, and guide the user back to completing the transactional use-case.\nIf the user tries to enter the same question more than once, answer that question dynamically keeping the response gist as static so that it looks more conversational. \nIgnore the spelling mistake by the user and understand the correct word by yourself and then respond back to the user only if the question or the Transactional use case is related to hospital appointment booking domain else remind them that the user is conversing with a virtual assistant for hospital appointment booking and request the user to ask a question from within the domain itself.",
        chatHistory: history,
        temperature: 0.8,
      });

      //update the chat history with bot response
      history = responseData.chatHistory;
      res.status(200).json(responseData.text);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json("There has been some error please contact the admin");
    }
  },
};
