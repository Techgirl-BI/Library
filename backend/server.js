import express from "express";
import cors from "cors"
import colors from "colors";
import dotenv from "dotenv";
dotenv.config({});
import morgan from "morgan";
import httpStatus from "http-status";
import { config } from "./Config/config.js";
import { dbConnect } from "./Config/db.js";
const app = express()
app.use(cors())
app.use(express.json())

dbConnect()
  .then((result) => {
    console.log("connected to Database".bgGreen);

const port = process.env.NODE_ENV ==="development"? process.env.PORT : 4040
    app.listen(port, (err) => {
      if (err) {
        console.log(`error:${err}`.bgRed);
        return;
      }
      console.log(
        `app is running on port ${port} in ${process.env.NODE_ENV} mode`.bgGreen
      );
    });
  })

  .catch((err) => console.log(`dbError:${err}`.bgRed));