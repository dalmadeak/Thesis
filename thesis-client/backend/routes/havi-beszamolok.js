const express = require('express');
const checkAuth = require('../middleware/auth');

const MonthlyReport = require('../models/havi-beszamolok');

const router = express.Router();

router.get('', (req,res,next) => {
  MonthlyReport.find()
    .then(documents => {
      res.status(200).json({
        message: 'Monthly Reports fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  MonthlyReport.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Monthly Report fetched successfully',
        post: fetchedPost
      });
    });
});

router.get('/:author', (req,res,next) => {
  MonthlyReport.find({author: req.params.author})
    .then(documents => {
      res.status(202).json({
        posts: documents
      });
    });
});

router.get('/:year/:month', (req,res,next) => {
  MonthlyReport.find({year: req.params.year, month: req.params.month})
    .then(fetchedPost => {
      res.status(201).json({
        message: 'Monthly Report fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, (req, res, next) => {

  const post = new MonthlyReport({
    postType: req.body.postType,
    author: req.authData,
    year: req.body.year,
    month: req.body.month,
    content: req.body.content,
    date: req.body.date,
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Monthly Report added successfully',
      postId: result._id
    });
  });
});

router.patch('/:id',checkAuth, (req,res,next) => {
  const post = new MonthlyReport({
    _id: req.body._id,
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

router.delete('/:id',checkAuth, (req, res, next) => {
  MonthlyReport.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'MonthlyReport deleted successfully'
    });
  });
});

module.exports = router;
