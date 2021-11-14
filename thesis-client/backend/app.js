const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Post = require('./models/hirek');
const hirek = require('./models/hirek');

// xtiV4hKL05OqaLbM
mongoose.connect("mongodb+srv://elnok:xtiV4hKL05OqaLbM@cluster0.pz2bf.mongodb.net/ikhokDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed.');
  });

//Ez itt azért kell, mert CORS error-t kapunk, ha a kliens és a szerver különböző host-on fut
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Middlewares
app.get('/api/hirek', (req,res,next) => {
  Post.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/hirek/:id', (req,res,next) => {
  Post.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Post fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/hirek', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
app.put('/api/hirek/:id', (req,res,next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(post);
    res.status(200).json({
      message: 'Post updated successfully'
    });
  });
});

app.delete('/api/hirek/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Post deleted successfully'
    });
  });
});


module.exports = app;
