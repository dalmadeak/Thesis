const express = require('express');

const EntranceCard = require('../models/belepokartya');

const router = express.Router();

router.get('', (req,res,next) => {
  EntranceCard.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'EntranceCards fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  EntranceCard.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'EntranceCard fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new EntranceCard({
    postType: req.body.postType,
    fullName: req.body.fullName,
    neptun: req.body.neptun,
    email: req.body.email,
    studentId: req.body.studentId,
    card: req.body.card,
    permissions: req.body.permissions,
    date: req.body.date,
    returnDate: req.body.returnDate,
    reason: req.body.reason,
    isApproved: req.body.isApproved
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'EntranceCard added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new EntranceCard({
    _id: req.body._id,
    postType: req.body.postType,
    fullName: req.body.fullName,
    neptun: req.body.neptun,
    email: req.body.email,
    studentId: req.body.studentId,
    card: req.body.card,
    permissions: req.body.permissions,
    date: req.body.date,
    returnDate: req.body.returnDate,
    reason: req.body.reason,
    isApproved: req.body.isApproved
  })
  EntranceCard.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'EntranceCard updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  EntranceCard.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'EntranceCard deleted successfully'
    });
  });
});

module.exports = router;
