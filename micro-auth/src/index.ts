import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import 'express-async-errors';

import router from "./routes";

import { natsWrapper } from "./nats_wrapper";

//Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    try {
      await connection.runMigrations();
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(bodyParser.json());

    //Set all routes from routes folder

    app.use("/", router);

    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("NATS_CLIENT_ID must be defined");
    }
    if (!process.env.NATS_URL) {
      throw new Error("NATS_URL must be defined");
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error("NATS_CLUSTER_ID must be defined");
    }

    try {
      await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
      );

      natsWrapper.client.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
      });
      process.on("SIGINT", () => natsWrapper.client.close());
      process.on("SIGTERM", () => natsWrapper.client.close());
      //Events put here
      //event
    } catch (err) {
      console.error(err);
    }

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch((error) => console.log(error));
