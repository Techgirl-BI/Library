import JWT from "jsonwebtoken";
import { config } from "../Config/config.js";

export const generateToken = (id, email) => {
  return JWT.sign({ id, email }, config.jwt.jwt_secret, {
    expiresIn: config.jwt.jwt_expiry,
  });
};