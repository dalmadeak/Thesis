const express = require('express');

const Presidium = require('../models/elnokseg');

const router = express.Router();

router.get('', (req,res,next) => {
  Presidium.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Presidiums fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Presidium.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Presidium fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', (req, res, next) => {
  const post = new Presidium({
    postType: req.body.postType,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    image: req.body.image
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Presidium added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  const post = new Presidium({
    _id: req.body._id,
    postType: req.body.postType,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    image: req.body.image
  })
  Presidium.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Presidium updated successfully'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Presidium.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Presidium deleted successfully'
    });
  });
});

module.exports = router;
