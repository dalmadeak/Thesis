const express = require('express');
const checkAuth = require('../middleware/auth');

const Post = require('../models/hirek');

const router = express.Router();

router.get('', (req,res,next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Post.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Post fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {
  const post = new Post({
    postType: req.body.postType,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  });

  post.save().then( result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });
});

router.put('/:id',checkAuth, (req,res,next) => {
  const post = new Post({
    _id: req.body._id,
    postType: req.body.postType,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Post updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Post deleted successfully'
    });
  });
});

module.exports = router;
