const express = require('express');

const ReportSummary = require('../models/beszamolok-osszegzes');

const router = express.Router();

router.get('', (req,res,next) => {
  ReportSummary.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'ReportSummarys fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  ReportSummary.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'ReportSummary fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new ReportSummary({
    postType: req.body.postType,
    year: req.body.year,
    month: req.body.month,
    reports: req.body.reports
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'ReportSummary added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new ReportSummary({
    _id: req.body._id,
    postType: req.body.postType,
    year: req.body.year,
    month: req.body.month,
    reports: req.body.reports
  })
  ReportSummary.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'ReportSummary updated successfully'
    });
  });
});

module.exports = router;
