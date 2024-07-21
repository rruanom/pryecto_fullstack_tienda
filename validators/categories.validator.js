const { body, param } = require("express-validator");

const validateCreateCategory = [
    body("name")
        .exists().withMessage("Category name is required")
        .isString().withMessage("Name should be a string")
];

const validateUpdateCategory = [
    param("id").isNumeric().withMessage("Category ID should be a number"),
    body("name")
        .exists().withMessage("Category name is required")
        .isString().withMessage("Name should be a string")
];

const validateDeleteCategory = [
    param("id").isNumeric().withMessage("Category ID should be a number")
];

module.exports = {
    validateCreateCategory,
    validateUpdateCategory,
    validateDeleteCategory
};