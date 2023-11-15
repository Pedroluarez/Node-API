// for env variables file
require("dotenv").config();
// for expressjs
const express = require("express");
// for mongodb
const mongoose = require("mongoose");
// calling the routers
const productRoute = require("./routes/productRoutes");
// calling the error middleware
const errorMiddleware = require("./middleware/errorMiddleware");
// calling CORS
const cors = require("cors");

// calling the env variable in env file
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;
const PORT = process.env.PORT || 3000;

const app = express();

// specific
var corsOptions = {
  // specifies who only can access the domain/api
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// middleware
app.use(express.json());
// middleware for cors
app.use(cors(corsOptions));
// middleware for calling of routes
app.use("/api/products", productRoute);

// app.get("/", (req, res) => {
//   throw new Error("Fake error");
// });

// middleware for calling error middleware
app.use(errorMiddleware);

// mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    // listener
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
