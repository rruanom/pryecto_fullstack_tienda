const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const checkAdmin = require('../middlewares/checkAdmin');
const { validateCreateCategory, validateUpdateCategory, validateDeleteCategory } = require('../validators/categories.validator');

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/', checkAdmin, validateCreateCategory, categoriesController.createCategory);
router.put('/:id', checkAdmin, validateUpdateCategory, categoriesController.updateCategory);
router.delete('/:id', checkAdmin, validateDeleteCategory, categoriesController.deleteCategory);

module.exports = router;