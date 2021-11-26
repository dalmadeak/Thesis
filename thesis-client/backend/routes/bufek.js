const express = require('express');
const checkAuth = require('../middleware/auth');

const Canteen = require('../models/bufek');

const router = express.Router();

router.get('', (req,res,next) => {
  Canteen.find()
    .then(documents => {
      res.status(200).json({
        message: 'Canteens fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Canteen.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Canteen fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {
  const post = new Canteen({
    postType: req.body.postType,
    name: req.body.name,
    brief: req.body.brief,
    openHours: req.body.openHours,
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Canteen added successfully',
      postId: result._id
    });
  });
});

router.put('/:id',checkAuth, (req,res,next) => {
  const post = new Canteen({
    _id: req.body._id,
    postType: req.body.postType,
    name: req.body.name,
    brief: req.body.brief,
    openHours: req.body.openHours,
  })
  Canteen.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Canteen updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Canteen.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Canteen deleted successfully'
    });
  });
});

module.exports = router;
