import { capitalizeFirstLetter } from "../utils/SendRes.js";
class AppError extends Error {
    statusCode;
    stack;
    message;
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = capitalizeFirstLetter(message);
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default AppError;
