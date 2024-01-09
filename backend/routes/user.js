import express from "express";
import validateMiddle from "../middleware/Validation.js";
import { userSchema } from "../controller/user/userSchema.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
  userProfileUpload,
} from "../controller/user/userCrud.js";
import { Authorized, userVerification } from "../middleware/Auth.js";
import { upload } from "../utility/multer.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(validateMiddle(userSchema), createUser)
  .get(getUsers);

  userRouter.route("/upload-profile").patch(userVerification,upload.single("avatar"), userProfileUpload)

userRouter
  .route("/:id")
  .get(userVerification, Authorized(["regular", "admin"]), getUser)
  .patch(userVerification, Authorized(["regular", "admin"]), updateUser)
  .delete(userVerification, Authorized(["regular", "admin"]),deleteUser);

userRouter.route("/login").post(loginUser);

export default userRouter;