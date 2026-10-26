const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    }
    catch (e) {
        next(e);
    }
};
export default validateRequest;
