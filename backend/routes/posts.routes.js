const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');


const multer = require('multer');
let renameImage ='';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    renameImage = Date.now() + '-' + file.originalname;
    cb(null, renameImage);
    return renameImage;
  },
});
let upload = multer({ storage: storage });
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

// wersja router.post z multerem
router.post('/posts/add', upload.single('file'), async (req, res) => {
  try {

    const { title, text, author, created, updated, status, photo, price, phone, location} = req.body;
    const uploadFile = req.file;
    console.log('req.body', req.body);
    console.log('req.file', uploadFile);

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
    // console.log('test1');

    if((authorMatched.length == author.length) && (titleMatched.length == title.length) && (textMatched.length == text.length)) {

      let newNameFile = null;
      let fileNameExt = null;
      // console.log('renameImage',renameImage);

      if(uploadFile !== undefined) {
        newNameFile = renameImage;
        const filePath = uploadFile.path;
        // console.log('filePath',filePath);
        // const getExtFile = filePath.split('/').slice(-1)[0];
        fileNameExt = filePath.split('.').slice(-1)[0];
        if((fileNameExt !== 'jpg') && (fileNameExt !== 'png') && (fileNameExt !== 'gif')) {
          throw new Error('Wrong format file');
        }
      }
      // console.log('newNameFile',newNameFile);
      // console.log('fileNameExt',fileNameExt);

      const newPost = new Post({ title, text, author, created, updated, status, photo: newNameFile, price, phone, location});
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

// wersja router.put z multerem
router.put(`/posts/:id/edit`, upload.single('file'), async (req, res) => {
  try {
    const { title, text, author, created, updated, status, photo, price, phone, location} = req.body;
    const uploadFile = req.file;
    console.log('req.body', req.body);
    console.log('req.file', uploadFile);
    console.log('req.params', req.params);

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
    console.log('test1');

    if((authorMatched.length == author.length) && (titleMatched.length == title.length) && (textMatched.length == text.length)) {
      let newNameFile = req.body.photo;
      let fileNameExt;
      console.log('renameImage',renameImage);

      if(uploadFile !== undefined) {
        newNameFile = renameImage;
        const filePath = uploadFile.path;
        console.log('filePath',filePath);
        fileNameExt = filePath.split('.').slice(-1)[0];
        if((fileNameExt !== 'jpg') && (fileNameExt !== 'png') && (fileNameExt !== 'gif')) {
          throw new Error('Wrong format file');
        }
      }
      console.log('newNameFile',newNameFile);
      console.log('fileNameExt',fileNameExt);

      const editedPost = await(Post.findById(req.body._id));
      console.log('editedPost',editedPost);
      if(editedPost) {
        const changedPost = await (Post.updateOne({ _id: req.body._id }, {$set: { title, text, author, status, created, updated, photo: newNameFile, price, phone, location }}));
        res.json(changedPost);
      }
      else {
        throw new Error('Something wrong!');
      }
    }
    else {
      throw new Error('Wrong input!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

// wersja router.post z express-formidable
// router.post('/posts/add', async (req, res) => {
//   try {
//     console.log('req.body', req.body);
//     console.log('req.file', req.file);

//     console.log('req.fields',req.fields);
//     console.log('req.files', req.files);
//     const { title, text, author, created, updated, status, photo, price, phone, location} = req.fields;
//     const file = req.files.file;
//     console.log('file',file);

//     const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
//     const contentPattern = new RegExp(/(.)*/, 'g');

//     const authorMatched = (author.match(authorPattern) || []).join('');
//     const titleMatched = (title.match(contentPattern) || []).join('');
//     const textMatched = (text.match(contentPattern) || []).join('');

//     if((authorMatched.length < author.length) && (titleMatched.length < title.length) && (textMatched.length < text.length)) {
//       throw new Error('Wrong characters used!');
//     }
//     if(title.length < 10) {
//       throw new Error('Too short title (min. 10 characters)');
//     }
//     if(text.length < 20) {
//       throw new Error('Too short text (min. 20 characters)');
//     }

//     if((authorMatched.length == author.length) && (titleMatched.length == title.length) && (textMatched.length == text.length)) {

//       let newNameFile = null;
//       let fileNameExt = null;

//       if(file !== undefined) {
//         const parseName = file.path.replace(/\\/g, '&#92;');
//         newNameFile = parseName.split('&#92;').slice(-1)[0];
//       }

//       if(newNameFile !== null) {
//         fileNameExt = newNameFile.split('.').slice(-1)[0];
//         if((fileNameExt !== 'jpg') && (fileNameExt !== 'png') && (fileNameExt !== 'gif')) {
//           throw new Error('Wrong format file');
//         }
//       }

//       const newPost = new Post({ title, text, author, created, updated, status, photo: newNameFile, price, phone, location});
//       await newPost.save();
//       console.log('newPost', newPost);
//       res.json(newPost);

//     } else {
//       throw new Error('Wrong input!');
//     }
//   }
//   catch(err) {
//     res.status(500).json(err);
//   }
// });

// wersja router.put z formidable
// router.put(`/posts/:id/edit`, async (req, res) => {
//   try {
//     const { title, text, author, created, updated, status, photo, price, phone, location} = req.fields;
//     const file = req.files.file;
//     console.log('req.fields',req.fields);
//     console.log('req.files.file',req.files.file);
//     // console.log('req.params', req.params);

//     const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
//     const contentPattern = new RegExp(/(.)*/, 'g');

//     const authorMatched = (author.match(authorPattern) || []).join('');
//     const titleMatched = (title.match(contentPattern) || []).join('');
//     const textMatched = (text.match(contentPattern) || []).join('');

//     if((authorMatched.length < author.length) && (titleMatched.length < title.length) && (textMatched.length < text.length)) {
//       throw new Error('Wrong characters used!');
//     }
//     if(title.length < 10) {
//       throw new Error('Too short title (min. 10 characters)');
//     }
//     if(text.length < 20) {
//       throw new Error('Too short text (min. 20 characters)');
//     }

//     if((authorMatched.length == author.length) && (titleMatched.length == title.length) && (textMatched.length == text.length)) {
//       let newNameFile;
//       let fileNameExt;
//       let newNamePhoto;
//       if(file !== undefined) {
//         const parseName = file.path.replace(/\\/g, '&#92;');
//         newNameFile = parseName.split('&#92;').slice(-1)[0];
//       }
//       if(newNameFile !== undefined) {
//         fileNameExt = newNameFile.split('.').slice(-1)[0];
//         newNamePhoto = newNameFile;
//       } else {
//         newNamePhoto = photo;
//         fileNameExt = photo.split('.').slice(-1)[0];
//       }
//       // console.log('fileNameExt', fileNameExt);
//       // console.log('newNamePhoto', newNamePhoto);

//       if(fileNameExt == 'jpg' || fileNameExt == 'png' || fileNameExt == 'gif') {
//         const editedPost = await(Post.findById(req.fields._id));
//         console.log('editedPost',editedPost);
//         if(editedPost) {
//           const changedPost = await (Post.updateOne({ _id: req.fields._id }, {$set: { title, text, author, status, created, updated, photo: newNamePhoto, price, phone, location }}));
//           res.json(changedPost);
//         }
//         else {
//           throw new Error('Something wrong!');
//         }
//       }
//     } else {
//       throw new Error('Something wrong!');
//     }
//   }
//   catch(err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
