const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
// const formidable = require('express-formidable');
// const uniqid = require('uniqid');

const postsRoutes = require('./routes/posts.routes');


const app = express();

/* MIDDLEWARE */
app.use(cors());

// express-formidable jako alternatywa dla multera
// app.use(formidable({ uploadDir: '/uploads/' }, [{
//   event: 'fileBegin',
//   action: (req, res, next, name, file) => {
//     const fileName = 'photo_' + uniqid() + '.' + file.name.split('.')[1];

//     // file.path = __dirname + '/uploads/photo_' + fileName;
//     file.path = path.join(__dirname, '../public/uploads/') + fileName;
//     console.log('dirname w server2', __dirname);
//     console.log('file.path', file.path);
//   }},
// ]));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* API ENDPOINTS */
app.use('/api', postsRoutes);


/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});


/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, './uploads')));
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});



/* MONGOOSE */
//mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://rafal:rafal123@cluster0.teavo.mongodb.net/bulletinboard?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
