import express from "express";

const app = express();

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi! User");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://auth-srv:${PORT}`);
});
