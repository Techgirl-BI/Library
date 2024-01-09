import express from "express";
import validateMiddle from "../middleware/Validation.js";
import { bookSchema } from "../controller/book/bookSchema.js";
import { Authorized, userVerification } from "../middleware/Auth.js"
import {
  createBooks,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controller/book/bookCrud.js";

const bookRouter = express.Router();

bookRouter
  .route("/")
  .post(
    validateMiddle(bookSchema),
    userVerification,
    Authorized(["librarian"]),
    createBooks
  )
  .get(getBooks);

bookRouter
  .route("/:id")
  .get(userVerification, Authorized(["librarian","regular","admin"]), getBook)
  .patch(userVerification, Authorized(["librarian"]), updateBook)
  .delete(userVerification, Authorized(["librarian"]), deleteBook);
export default bookRouter;