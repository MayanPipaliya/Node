const express = require('express');
const router = express.Router();
const recipes = require('../controllers/recipeController');
const { requireAuth } = require('../middleware/auth');

// public
router.get('/', recipes.list);
router.get('/:id', recipes.getById);

// auth required
router.post('/', requireAuth, recipes.create);
router.get('/my/list', requireAuth, recipes.myRecipes);
router.post('/:id/comments', requireAuth, recipes.addComment);
router.put('/:id', requireAuth, recipes.update);
router.delete('/:id', requireAuth, recipes.delete);

module.exports = router;
