import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
const createAccessToken = (payload, secret, expiresIn) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn,
    });
    return token;
};
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    }
    catch (err) {
        throw new AppError(400, "You are not allows!", err);
    }
};
export const tokenHelper = {
    createAccessToken,
    verifyToken,
};
