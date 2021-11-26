const express = require('express');
const checkAuth = require('../middleware/auth');

const Office = require('../models/iroda');

const router = express.Router();

router.get('', (req,res,next) => {
  Office.find()
    .then(documents => {
      res.status(200).json({
        message: 'Offices fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Office.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Office fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {
  const post = new Office({
    postType: req.body.postType,
    name: req.body.name,
    brief: req.body.brief,
    openHours: req.body.openHours,
  });

  post.save().then( result => {
    res.status(201).json({
      message: 'Office added successfully',
      postId: result._id
    });
  });
});

router.put('/:id',checkAuth, (req,res,next) => {
  const post = new Office({
    _id: req.body._id,
    postType: req.body.postType,
    name: req.body.name,
    brief: req.body.brief,
    openHours: req.body.openHours,
  })
  Office.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Office updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Office.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Office deleted successfully'
    });
  });
});

module.exports = router;
