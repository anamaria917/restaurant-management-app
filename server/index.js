import express from "express";

const app = express();

app.get("/test-connection", function (req, res) {
  res.send("Hello! You are all set!");
});

const server = app.listen(3001, function () {
  const port = server.address().port;

  console.log(`Server started on PORT ${port}`);
});
