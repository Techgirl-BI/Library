import express from "express";
import cors from "cors"
import colors from "colors";
import dotenv from "dotenv";
dotenv.config({});
import morgan from "morgan";
import httpStatus from "http-status";
import { config } from "./Config/config.js";
import { dbConnect } from "./Config/db.js";
import userRouter from "./routes/user.js";
import bookRouter from "./routes/book.js";
import categoryRouter from "./routes/category.js";
const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static("public"))

app.use("/user", userRouter)
app.use("/book", bookRouter)
app.use("/category",categoryRouter)
app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    payload: "Welcome! to E-Library App",
  });
});

app.all("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    payload: "endpoint not defined",
  });
});

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