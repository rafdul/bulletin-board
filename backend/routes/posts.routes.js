const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title text photo status')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const { _id, title, text, author, created, updated, status, photo, price, phone, location } = req.body;
    const newPost = new Post({ _id: _id, title: title, text: text, author: author, created: created, updated: updated, status: status, photo: photo, price: price, phone: phone, location: location });
    await newPost.save();
    res.json({ message: 'OK (Add new Post done)'});
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
