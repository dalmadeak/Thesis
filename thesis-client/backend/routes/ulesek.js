const express = require('express');

const Meeting = require('../models/ulesek');

const router = express.Router();

router.get('', (req,res,next) => {
  Meeting.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Meetings fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Meeting.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Meeting fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Meeting({
    committee: req.body.committee,
    type: req.body.type,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Meeting added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Meeting({
    _id: req.body._id,
    committee: req.body.committee,
    type: req.body.type,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files,
  })
  Meeting.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Meeting updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Meeting.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Meeting deleted successfully'
    });
  });
});

module.exports = router;
