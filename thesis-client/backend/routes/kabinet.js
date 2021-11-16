const express = require('express');

const Cabinet = require('../models/kabinet');

const router = express.Router();

router.get('', (req,res,next) => {
  Cabinet.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Cabinets fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Cabinet.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Cabinet fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Cabinet({
    postType: req.body.postType,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    image: req.body.image
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Cabinet added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Cabinet({
    _id: req.body._id,
    postType: req.body.postType,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    image: req.body.image
  })
  Cabinet.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Cabinet updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Cabinet.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Cabinet deleted successfully'
    });
  });
});

module.exports = router;
