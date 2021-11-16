const express = require('express');

const Report = require('../models/beszamolok');

const router = express.Router();

router.get('', (req,res,next) => {
  Report.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Reports fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Report.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Report fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Report({
    postType: req.body.postType,
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Report added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Report({
    _id: req.body._id,
    postType: req.body.postType,
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  })
  Report.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Report updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Report.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Report deleted successfully'
    });
  });
});

module.exports = router;
