import express from "express";
import validateMiddle from "../middleware/Validation.js";
import { categorySchema } from "../controller/category/categorySchema.js";
import { Authorized, userVerification } from "../middleware/Auth.js";
import {
  createCategory,
  getCategories,
  getCategory,
} from "../controller/category/categoryCrud.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    validateMiddle(categorySchema),
    userVerification,
    Authorized(["librarian"]),
    createCategory
  )
  .get(getCategories);

categoryRouter
  .route("/:id")
  .get(userVerification, Authorized(["regular", "admin", "librarian"]),getCategory);

export default categoryRouter;