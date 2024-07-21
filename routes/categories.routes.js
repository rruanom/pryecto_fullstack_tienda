const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/', checkAdmin, categoriesController.getAllCategories);
router.get('/:id', checkAdmin, categoriesController.getCategoryById);
router.post('/', checkAdmin, categoriesController.createCategory);
router.put('/:id', checkAdmin, categoriesController.updateCategory);
router.delete('/:id', checkAdmin, categoriesController.deleteCategory);

module.exports = router;