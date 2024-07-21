const { body, param } = require("express-validator");

const validateCreateUser = [
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required")
];

const validateSaveCart = [
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("cart")
        .exists().withMessage("Cart is required")
        .isArray().withMessage("Cart should be an array")
];

const validateGetPreviousCarts = [
    param("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required")
];

module.exports = {
    validateCreateUser,
    validateSaveCart,
    validateGetPreviousCarts
};