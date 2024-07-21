const { body, param } = require("express-validator");

const validateCreateProvider = [
    body("name")
        .exists().withMessage("Provider name is required")
        .isString().withMessage("Name should be a string"),
    body("cif")
        .exists().withMessage("CIF is required")
        .isString().withMessage("CIF should be a string"),
    body("address")
        .exists().withMessage("Address is required")
        .isString().withMessage("Address should be a string")
];

const validateUpdateProvider = [
    param("id").isNumeric().withMessage("Provider ID should be a number"),
    body("name").optional().isString().withMessage("Name should be a string"),
    body("cif").optional().isString().withMessage("CIF should be a string"),
    body("address").optional().isString().withMessage("Address should be a string")
];

const validateDeleteProvider = [
    param("id").isNumeric().withMessage("Provider ID should be a number")
];

module.exports = {
    validateCreateProvider,
    validateUpdateProvider,
    validateDeleteProvider
};