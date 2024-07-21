const { body, query, param } = require("express-validator");

const validateCreateProduct = [
    body("name")
        .exists().withMessage("Product name is required")
        .isString().withMessage("Name should be a string"),
    body("price")
        .exists().withMessage("Price is required")
        .isNumeric().withMessage("Price should be a number"),
    body("description")
        .exists().withMessage("Description is required")
        .isString().withMessage("Description should be a string"),
    body("id_category")
        .exists().withMessage("Category ID is required")
        .isNumeric().withMessage("Category ID should be a number"),
    body("id_provider")
        .exists().withMessage("Provider ID is required")
        .isNumeric().withMessage("Provider ID should be a number"),
    body("image")
        .optional().isString().withMessage("Image should be a string")
];

const validateUpdateProduct = [
    param("id")
        .isNumeric().withMessage("Product ID should be a number"),
    body("name")
        .optional().isString().withMessage("Name should be a string"),
    body("price")
        .optional().isNumeric().withMessage("Price should be a number"),
    body("description")
        .optional().isString().withMessage("Description should be a string"),
    body("id_category")
        .optional().isNumeric().withMessage("Category ID should be a number"),
    body("id_provider")
        .optional().isNumeric().withMessage("Provider ID should be a number"),
    body("image")
        .optional().isString().withMessage("Image should be a string")
];

const validateDeleteProduct = [
    param("id").isNumeric().withMessage("Product ID should be a number")
];

const validateGetProductsByFilters = [
    query("category")
        .optional().isString(),
    query("provider")
        .optional().isString(),
    query("keyword")
        .optional().isString(),
    query("page")
        .optional().isNumeric(),
    query("priceOrder")
        .optional().isIn(['asc', 'desc']),
    query("limit")
        .optional().isNumeric()
];

module.exports = {
    validateCreateProduct,
    validateUpdateProduct,
    validateDeleteProduct,
    validateGetProductsByFilters
};