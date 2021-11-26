const express = require('express');
const checkAuth = require('../middleware/auth');

const Delegate = require('../models/kuldottgyules');

const router = express.Router();

router.get('', (req,res,next) => {
  Delegate.find()
    .then(documents => {
      res.status(200).json({
        message: 'Delegates fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Delegate.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Delegate fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {
  const post = new Delegate({
    postType: req.body.postType,
    fullName: req.body.fullName,
    firstPosition: req.body.firstPosition,
    firstCommittee: req.body.firstCommittee,
    secondPosition: req.body.secondPosition,
    secondCommittee: req.body.secondCommittee,
    email: req.body.email
  });

  post.save().then( result => {
    res.status(201).json({
      message: 'Delegate added successfully',
      postId: result._id
    });
  });
});

router.put('/:id',checkAuth, (req,res,next) => {
  const post = new Delegate({
    _id: req.body._id,
    postType: req.body.postType,
    fullName: req.body.fullName,
    firstPosition: req.body.firstPosition,
    firstCommittee: req.body.firstCommittee,
    secondPosition: req.body.secondPosition,
    secondCommittee: req.body.secondCommittee,
    email: req.body.email

  })
  Delegate.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Delegate updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Delegate.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Delegate deleted successfully'
    });
  });
});

module.exports = router;
