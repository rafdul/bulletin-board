const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

// let upload = require('../server');


// const multer = require('multer');
// let renameImage ='';
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     renameImage = Date.now() + '-' + file.originalname;
//     cb(null, renameImage);
//     return renameImage;
//   },
// });
// let upload = multer({ storage: storage });
// console.log('upload w postroutes', upload);


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

    console.log('req.fields',req.fields);
    console.log('req.files', req.files);
    const { title, text, author, created, updated, status, photo, price, phone, location} = req.fields;
    const file = req.files.file;
    console.log('file',file);
    console.log('file.path',file.path);

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

      const parseName = file.path.replace(/\\/g, '&#92;');
      const newNameFile = parseName.split('&#92;').slice(-1)[0];
      console.log('newName', newNameFile);
      const fileNameExt = newNameFile.split('.').slice(-1)[0];
      console.log('fileNameExt', fileNameExt);

      if(fileNameExt == 'jpg' || fileNameExt == 'png' || fileNameExt == 'gif') {
        const newPost = new Post({ title, text, author, created, updated, status, photo: newNameFile, price, phone, location});
        await newPost.save();
        console.log('newPost', newPost);
        res.json(newPost);
      } else {
        throw res.json('Try one more');
      }

    } else {
      throw new Error('Wrong input!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put(`/posts/:id/edit`, async (req, res) => {
  try {

    const { title, text, author, created, updated, status, photo, price, phone, location} = req.fields;
    const file = req.files.file;
    console.log('req.fields',req.fields);
    console.log('req.files.file',req.files.file);
    console.log('req.params', req.params);

    const parseName = file.path.replace(/\\/g, '&#92;');
    const newNameFile = parseName.split('&#92;').slice(-1)[0];
    console.log('newName', newNameFile);
    const fileNameExt = newNameFile.split('.').slice(-1)[0];
    console.log('fileNameExt', fileNameExt);

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
      if(fileNameExt == 'jpg' || fileNameExt == 'png' || fileNameExt == 'gif') {
        const editedPost = await(Post.findById(req.fields._id));
        console.log('editedPost',editedPost);
        if(editedPost) {
          const changedPost = await (Post.updateOne({ _id: req.fields._id }, {$set: { title, text, author, created, updated, status, photo: newNameFile, price, phone, location }}));
          console.log('changedPost', changedPost);
          res.json(changedPost);
        }
        else {
          throw new Error('Something wrong!');
        }
      }

    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
