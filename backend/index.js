const express = require("express");
const app = express();
const route = require("./routes/chatbot");
const cors = require("cors");
const bodyParser = require("body-parser");

//json
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

//cors
const corsOptions = {
  credentials: true,
  //access-control-allow-credentials:true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/chatbot", route);

app.listen(3000, () => {
  console.log("Working at 3000");
});
