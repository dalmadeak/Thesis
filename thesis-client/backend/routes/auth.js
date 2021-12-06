const express = require('express');
const bcrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/auth');

router.get('', (req,res,next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: 'Users fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  User.find({_id: req.params.id})
    .then(fetchedUser => {
      res.status(200).json({
        message: 'User fetched successfully',
        post: fetchedUser
      });
    });
});

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const post = new User({
        postType: req.body.postType,
        fullName: req.body.fullName,
        identifier: req.body.identifier,
        password: hash,
        position: req.body.position,
        email: req.body.email,
        permissions: req.body.permissions
      });
      post.save().then( result => {
        res.status(201).json({
          message: 'User added successfully',
          postId: result._id
        });
      })
    })
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({identifier: req.body.identifier})
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: 'Authentication failed!'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Authentication failed!'
        });
      }
      const token = jsonwt.sign({
        userId: fetchedUser._id,
        identifier: fetchedUser.identifier,
        fullName: fetchedUser.fullName,
        position: fetchedUser.position,
        email: fetchedUser.email,
        permissions: fetchedUser.permissions,
      }, "ikhokSecretPass_forTokenIdentification", { expiresIn: '1h'});
      res.status(200).json({
        token: token,
        expiresIn: '60',
        userId: fetchedUser._id,
        fullName: fetchedUser.fullName,
        position: fetchedUser.position,
        email: fetchedUser.email,
        permissions: fetchedUser.permissions,
      });
    })
    .catch(error => {
      return res.status(401).json({
        message: 'Authentication failed!'
      });
    })
});

router.patch('/register/user/:id', (req,res,next) => {
  const post = {
    fullName: req.body.fullName,
    email: req.body.email
  };
  User.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'User updated successfully'
    });
  })
})

router.patch('/register/password/:id', (req,res,next) => {
  bcrypt.hash(req.body.password, 10)
    .then(() => {
      User.findOne({_id: req.body.userId})
      .then(user => {
        return bcrypt.compare(req.body.oldPass, user.password)
          .then(result => {
            if(!result) {
              return res.status(401).json({
                message: 'No new password added'
              });
            } else {
              bcrypt.hash(req.body.password, 10)
              .then(newHash => {
                const post = {
                  password: newHash
                };
                User.updateOne({_id: req.params.id}, post).then(result => {
                  res.status(200).json({
                    message: 'User updated successfully'
                  });
                })
              })
            }
          });
    });
  });
})

module.exports = router;
