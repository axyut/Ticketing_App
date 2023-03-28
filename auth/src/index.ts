import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// Routing
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// Error 404
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error handling
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://auth-srv:${PORT}`);
});
