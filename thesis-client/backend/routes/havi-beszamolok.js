const express = require('express');

const MonthlyReport = require('../models/havi-beszamolok');

const router = express.Router();

router.get('', (req,res,next) => {
  MonthlyReport.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Monthly Reports fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  MonthlyReport.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Monthly Report fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new MonthlyReport({
    author: req.body.author,
    year: req.body.year,
    month: req.body.month,
    content: req.body.content,
    date: req.body.date,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Monthly Report added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new MonthlyReport({
    _id: req.body._id,
    author: req.body.author,
    year: req.body.year,
    month: req.body.month,
    content: req.body.content,
    date: req.body.date,
  })
  MonthlyReport.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Monthly Report updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  MonthlyReport.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'MonthlyReport deleted successfully'
    });
  });
});

module.exports = router;
