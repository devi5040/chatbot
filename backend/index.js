//import modules required(express, cors, body-parser)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//importing the route needed
const route = require("./routes/chatbot");

//instantiate express
const app = express();

//to send response in json
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//configuring cors
const corsOptions = {
  credentials: true,
  //access-control-allow-credentials:true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//setting up the route
app.use("/chatbot", route);

//start the server
app.listen(3000, () => {
  console.log("Working at 3000");
});
