import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }
    if (!token) {
      throw new ApiError(401, "Not authorized, token missing");
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded?._id);
    if (!user) {
      throw new ApiError(401, "Not authorized, user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired, please login again"));
    }
    return next(new ApiError(401, "Not authorized, token failed"));
  }
};
