const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  user: "migracode",
  host: "localhost",
  database: "tweet_project",
  password: "migracode1234",
  port: 5432,
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/tweet", function (req, res) {
  let { content, authorid } = req.body;
  let query =
    'INSERT INTO tweets (content, date, "authorid") VALUES ($1, $2, $3);';
  let now = new Date();
  pool
    .query(query, [content, now, authorid])
    .then((result) => res.status(201).send("Tweet created :) !"))
    .catch((error) => {
      console.log(error);
      res.status(500).send("something went wrong :( ...");
    });
});
app.get("/users/:userId/tweets", function (req, res) {
  let { userId } = req.params;
  let query = 'SELECT * FROM tweets WHERE "authorid" = $1';
  pool
    .query(query, [userId])
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).send("something went wrong :( ...");
    });
});
app.delete("/tweets/:id", function (req, res) {
  let { id } = req.params;
  let query = 'DELETE FROM tweets WHERE "id" = $1';
  pool
    .query(query, [id])
    .then((result) => res.status(200).send("tweet deleted"))
    .catch((error) => {
      console.log(error);
      res.status(500).send("something went wrong :( ...");
    });
});
app.put("/tweets/:identifier", function (req, res) {
  let { identifier } = req.params;
  let { content, authorid } = req.body;
  let query =
    "update tweets set content = $1, date = $2, authorid = $3 where id = $4";
  pool
    .query(query, [content, new Date(), authorid, identifier])
    .then((result) => res.status(200).send("tweet updated"))
    .catch((error) => {
      console.log(error);
      res.status(500).send("something went wrong :( ...");
    });
});
app.post("/tweets/:tweetId/like", function (req, res) {
  let { followerId, like } = req.body;
  let { tweetId } = req.params;
  let query =
    'INSERT INTO likes ("tweetId", "followerId", "like") VALUES ($1, $2, $3);';
  pool
    .query(query, [tweetId, followerId, like])
    .then((result) => res.status(200).send("tweet liked :) !"))
    .catch((error) => {
      console.log(error);
      res.status(500).send("something went wrong :( ...");
    });
});

app.listen(3001, function () {
  console.log("Server is listening on port 3001. Ready to accept requests!");
});
