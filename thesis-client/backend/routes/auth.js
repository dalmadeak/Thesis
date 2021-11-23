const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/auth');
const { runInNewContext } = require('vm');

router.get('', (req,res,next) => {
  User.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Users fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  User.find({_id: req.params.id})
    .then(fetchedUser => {
      res.status(200).json({
        message: 'User fetched successfully',
        post: fetchedUser
      });
    });
});

router.post('', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const post = new User({
        postType: req.body.postType,
        identifier: req.body.identifier,
        password: hash,
        position: req.body.position,
        email: req.body.email
      });
      post.save().then( result => {
        res.status(201).json({
          message: 'User added successfully',
          postId: result._id
        });
      })
    })
});

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', (req,res,next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const post = new User({
        postType: req.body.postType,
        identifier: req.body.identifier,
        password: hash,
        position: req.body.position,
        email: req.body.email
      });
      User.updateOne({_id: req.params.id}, post).then(result => {
        res.status(200).json({
          message: 'User updated successfully'
        });
      })
    })
});

router.delete('/:id', (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'User deleted successfully'
    });
  });
});

module.exports = router;
