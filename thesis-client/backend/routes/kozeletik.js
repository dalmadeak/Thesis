const express = require('express');
const checkAuth = require('../middleware/auth');

const ScholarShip = require('../models/kozeletik');

const router = express.Router();

router.get('', (req,res,next) => {
  ScholarShip.find()
    .then(documents => {
      res.status(200).json({
        message: 'ScholarShip fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  ScholarShip.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'ScholarShip fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {
  const post = new ScholarShip({
    postType: req.body.postType,
    postType: req.body.postType,
    name: req.body.name,
    amount: req.body.amount
  });

  post.save().then( result => {
    res.status(201).json({
      message: 'ScholarShip added successfully',
      postId: result._id
    });
  });
});

router.put('/:id',checkAuth, (req,res,next) => {
  const post = new ScholarShip({
    _id: req.body._id,
    postType: req.body.postType,
    name: req.body.name,
    amount: req.body.amount
  })
  ScholarShip.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'ScholarShip updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  ScholarShip.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'ScholarShip deleted successfully'
    });
  });
});

module.exports = router;
