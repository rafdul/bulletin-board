const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title text photo status price location _id')
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
    console.log('req.body w post',req.body);
    const { title, text, author, created, updated, status, photo, price, phone, location } = req.body;
    // const photo = req.files.file;

    const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
    const contentPattern = new RegExp(/(.)*/, 'g');

    const authorMatched = (author.match(authorPattern) || []).join('');
    const titleMatched = (title.match(contentPattern) || []).join('');
    const textMatched = (text.match(contentPattern) || []).join('');

    if((authorMatched.length < author.length) && (titleMatched.length < title.length) && (textMatched.length < text.length)) {
      throw new Error('Wrong characters used!');
    }
    if(title.length < 10) {
      throw new Error('Too short title (min. 10 characters)');
    }
    if(text.length < 20) {
      throw new Error('Too short text (min. 20 characters)');
    }

    if((authorMatched.length == author.length) && (titleMatched.length == title.length) && (textMatched.length == text.length)) {

      // const fileName = photo.path.split('/').slice(-1)[0];
      // const fileNameExt = fileName.split('.').slice(-1)[0];

      // if((fileNameExt === 'jpg' || 'png' || 'gif') && title.length >= 10 && author.length >= 20) {
      //   const newPost = new Post({ _id: _id, title: title, text: text, author: author, created: created, updated: updated, status: status, photo: photo, price: price, phone: phone, location: location });
      //   await newPost.save();
      //   res.json(newPost);
      // } else {
      //   throw res.json('Try one more');
      // }
      const newPost = new Post({ title, text, author, created, updated, status, photo, price, phone, location });
      await newPost.save();
      console.log('newPost', newPost);
      res.json(newPost);
    } else {
      throw new Error('Wrong input!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id/edit', async (req, res) => {
  try {
    const { title, text, author, created, updated, status, photo, price, phone, location } = req.body;
    const editedPost = await(Post.findById(req.params.id));

    if(editedPost) {
      const changedPost = await (Post.updateOne({ _id: req.params.id }, {$set: { title, text, author, created, updated, status, photo, price, phone, location }}));
      res.json(changedPost);
    }
    else {
      throw new Error('Something wrong!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
