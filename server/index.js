import dotenv from "dotenv";
dotenv.config();

import express from "express";
import DatabaseHelper from "./helpers/databaseHelper";

// Initialize database
DatabaseHelper.initialize();

import apolloServer from "./database/apolloServer";

const server = express();

server.get("/test-connection", function (req, res) {
  res.send("Hello! You are all set!");
});

// Start and attach apollo server to express server
apolloServer.start().then(() => apolloServer.applyMiddleware({ app: server }));

DatabaseHelper.initialized()
  .then(() => {
    server.listen(process.env.SERVER_PORT, process.env.SERVER_URL, () => {
      console.log(`Server started on PORT ${process.env.SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
