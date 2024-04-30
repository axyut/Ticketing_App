import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // for ingress proxy
app.use(
  cookieSession({
    signed: false,
    //secure: true // only work in https
  })
);

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// Routing
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// temp test
app.get("/", (req, res) => {
  res.send("HOME");
});

// Error 404
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error handling
app.use(errorHandler);
const start = async () => {
  const PORT = 3000;
  const username = process.env.mongo_USER;
  const pass = process.env.mongo_PASS;
  const db_name = process.env.mongo_DB_NAME;
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${username}:${pass}@newcluster.zcb8pse.mongodb.net/${db_name}`
    );
    console.log(
      "Successfully connected to DB.",
      connection.connection.name,
      connection.connection.host,
      connection.connection.port
    );
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log(`Listening at http://auth-srv:${PORT}`);
  });
};

start();
