const express = require('express');

const Office = require('../models/iroda');

const router = express.Router();

router.get('', (req,res,next) => {
  Office.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Offices fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Office.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Office fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Office({
    postType: req.body.postType,
    name: req.body.name,
    brief: req.body.brief,
    openHours: req.body.openHours,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Office added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
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

router.delete('/:id', (req, res, next) => {
  Office.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Office deleted successfully'
    });
  });
});

module.exports = router;
