const express = require('express');
const checkAuth = require('../middleware/auth');

const Meeting = require('../models/ulesek');

const router = express.Router();

router.get('', (req,res,next) => {
  Meeting.find()
    .then(documents => {
      res.status(200).json({
        message: 'Meetings fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Meeting.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Meeting fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {
  const post = new Meeting({
    postType: req.body.postType,
    author: req.authData,
    committee: req.body.committee,
    type: req.body.type,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    date: req.body.date
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Meeting added successfully',
      postId: result._id
    });
  });
});

router.put('/:id',checkAuth, (req,res,next) => {
  const post = new Meeting({
    _id: req.body._id,
    postType: req.body.postType,
    author: req.authData,
    committee: req.body.committee,
    type: req.body.type,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    date: req.body.date
  })
  Meeting.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Meeting updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Meeting.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Meeting deleted successfully'
    });
  });
});

module.exports = router;
