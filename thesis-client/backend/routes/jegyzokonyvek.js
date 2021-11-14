const express = require('express');

const Record = require('../models/jegyzokonyvek');

const router = express.Router();

router.get('', (req,res,next) => {
  Record.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Record fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Record.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Record fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Record({
    committee: req.body.committee,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Record added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Record({
    _id: req.body._id,
    committee: req.body.committee,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    date: req.body.date,
    files: req.body.files
  })
  Record.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Record updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Record.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Record deleted successfully'
    });
  });
});

module.exports = router;
