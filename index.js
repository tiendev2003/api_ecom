const express = require("express");
require("express-async-errors");
const passport = require("passport");
const session = require("express-session");
const notFoundMiddleware = require("./src/middleware/notFoundMiddleware");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const cors = require("cors");
const bodyParser = require("body-parser");
require('./src/database/config/connectDB');
var cookieParser = require("cookie-parser");
const connectDB = require("./src/database/config/connectDB");
const createRouters = require("./src/routers/index");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/static", express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World");
});
createRouters(app);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const startServer = async (app, port) => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer(app, port);
