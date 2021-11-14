const express = require('express');

const Decision = require('../models/hatarozatok');

const router = express.Router();

router.get('', (req,res,next) => {
  Decision.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Decisions fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Decision.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Decision fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Decision({
    committee: req.body.committee,
    number: req.body.number,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    mandate: req.body.mandate,
    vote: req.body.vote,
    date: req.body.date,
    files: req.body.files,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Decision added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Decision({
    _id: req.body._id,
    committee: req.body.committee,
    number: req.body.number,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    mandate: req.body.mandate,
    vote: req.body.vote,
    date: req.body.date,
    files: req.body.files,
  })
  Decision.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Decision updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Decision.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Decision deleted successfully'
    });
  });
});

module.exports = router;
