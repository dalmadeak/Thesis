const express = require('express');

const Application = require('../models/palyazatok');

const router = express.Router();

router.get('', (req,res,next) => {
  Application.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Applications fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Application.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Application fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Application({
    postType: req.body.postType,
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Application added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Application({
    _id: req.body._id,
    postType: req.body.postType,
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  })
  Application.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Application updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Application.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Application deleted successfully'
    });
  });
});

module.exports = router;
