const express = require('express');
const router = express.Router();

// Desturcturing the javascript object for controllers
const { getAllPosts, createPost, deletePost } = require('../controllers/post');

router.get('/', getAllPosts);

router.post('/', createPost);

router.delete('/:id', deletePost);

module.exports = router;