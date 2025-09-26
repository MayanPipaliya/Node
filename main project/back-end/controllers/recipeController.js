const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.list = async (req, res) => {
  const recipes = await Recipe.find().populate('author', 'username');
  res.json({ recipes });
};

exports.getById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
    .populate('author', 'username')
    .populate({ path: 'comments', populate: { path: 'author', select: 'username' }});
  if (!recipe) return res.status(404).json({ error: 'Not found' });
  res.json({ recipe });
};

exports.create = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const { title, description, ingredients, instructions } = req.body;
  const ingArr = typeof ingredients === 'string' ? ingredients.split(',').map(s => s.trim()) : (ingredients || []);
  const recipe = new Recipe({
    title, description, ingredients: ingArr, instructions, author: req.user.id
  });
  await recipe.save();
  // attach to user
  await User.findByIdAndUpdate(req.user.id, { $push: { recipes: recipe._id }});
  res.json({ ok: true, recipe });
};

exports.myRecipes = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const user = await User.findById(req.user.id).populate({ path: 'recipes', populate: { path: 'author', select: 'username' }});
  res.json({ recipes: user.recipes || [] });
};

exports.update = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Not found' });
  if (String(recipe.author) !== String(req.user.id) && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { title, description, ingredients, instructions } = req.body;
  if (title) recipe.title = title;
  if (description) recipe.description = description;
  if (ingredients) recipe.ingredients = typeof ingredients === 'string' ? ingredients.split(',').map(s=>s.trim()) : ingredients;
  if (instructions) recipe.instructions = instructions;
  await recipe.save();
  res.json({ ok: true, recipe });
};

exports.delete = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Not found' });
  if (String(recipe.author) !== String(req.user.id) && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  await Recipe.findByIdAndDelete(req.params.id);
  await User.findByIdAndUpdate(req.user.id, { $pull: { recipes: req.params.id }});
  res.json({ ok: true });
};

exports.addComment = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const { text } = req.body;
  const comment = new Comment({ text, author: req.user.id, recipe: req.params.id });
  await comment.save();
  await Recipe.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id }});
  res.json({ ok: true, comment });
};
