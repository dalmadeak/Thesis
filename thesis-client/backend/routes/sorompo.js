const express = require('express');
const checkAuth = require('../middleware/auth');

const Barrier = require('../models/sorompo');

const router = express.Router();

router.get('', (req,res,next) => {
  Barrier.find()
    .then(documents => {
      res.status(200).json({
        message: 'Barriers fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Barrier.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Barrier fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {
  const post = new Barrier({
    postType: req.body.postType,
    fullName: req.body.fullName,
    neptun: req.body.neptun,
    plate: req.body.plate,
    type: req.body.type,
    card: req.body.card,
    phone: req.body.phone,
    email: req.body.email,
    date: req.body.date,
    semester: req.body.semester,
    reason: req.body.reason,
    isApproved: req.body.isApproved
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Barrier added successfully',
      postId: result._id
    });
  });
});

router.put('/:id',checkAuth, (req,res,next) => {
  const post = new Barrier({
    _id: req.body._id,
    postType: req.body.postType,
    fullName: req.body.fullName,
    neptun: req.body.neptun,
    plate: req.body.plate,
    type: req.body.type,
    card: req.body.card,
    phone: req.body.phone,
    email: req.body.email,
    date: req.body.date,
    semester: req.body.semester,
    reason: req.body.reason,
    isApproved: req.body.isApproved
  })
  Barrier.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Barrier updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Barrier.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Barrier deleted successfully'
    });
  });
});

module.exports = router;
