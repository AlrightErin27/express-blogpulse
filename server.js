// requried modules
const express = require("express");
const db = require("./models");
const rowdy = require("rowdy-logger");
const morgan = require("morgan");

// config express app
const app = express();
const PORT = 3000;
const rowdyResults = rowdy.begin(app);

// express middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

/**
 * home route
 */

// GET / - READ all articles and include authors & tags
app.get("/", async (req, res) => {
  try {
    const articles = await db.article.findAll({ include: [db.author, db.tag] });
    res.json({ articles: articles });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

/**
 * /authors routes
 */

// GET /authors - READ all authors

app.use("/authors", require("./controllers/authors"));
app.use("/articles", require("./controllers/articles"));
app.use("/tags", require("./controllers/tags"));
//
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  rowdyResults.print();
});
