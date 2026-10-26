export function capitalizeFirstLetter(text) {
    const normalized = text.trim().replace(/\s+/g, " ").toLowerCase();
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
const sendRes = (payload) => {
    const { res, success, statusCode, data } = payload;
    let message = capitalizeFirstLetter(payload.message);
    return res.status(statusCode).json({
        success,
        statusCode,
        message,
        data,
    });
};
export default sendRes;
