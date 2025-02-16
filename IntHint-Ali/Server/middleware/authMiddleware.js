import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token received");
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            throw new ApiError(401, "Invalid or Expired Access Token");
        }

        console.log("\nDecoded Token:  ", decodedToken);

        const foundUser = await userModel.findById(decodedToken?.id).select("-password -refreshToken"); // Fixed reference

        if (!foundUser) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = foundUser;
        console.log("---USER---\n", req.user);
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
