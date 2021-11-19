const express = require('express');

const Delegate = require('../models/kuldottgyules');

const router = express.Router();

router.get('', (req,res,next) => {
  Delegate.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Delegates fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Delegate.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Delegate fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Delegate({
    postType: req.body.postType,
    fullName: req.body.fullName,
    firstCommittee: req.body.firstCommittee,
    secondCommittee: req.body.secondCommittee,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Delegate added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Delegate({
    _id: req.body._id,
    postType: req.body.postType,
    fullName: req.body.fullName,
    firstCommittee: req.body.firstCommittee,
    secondCommittee: req.body.secondCommittee,
  })
  Delegate.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Delegate updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Delegate.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Delegate deleted successfully'
    });
  });
});

module.exports = router;
