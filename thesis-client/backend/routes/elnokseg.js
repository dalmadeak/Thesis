const express = require('express');
const multer = require("multer");
const checkAuth = require('../middleware/auth');

const Presidium = require('../models/elnokseg');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid type');
    if (isValid){
      error = null
    }
    cb(error, "images");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extention = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extention);
  }
});

router.get('', (req,res,next) => {
  Presidium.find()
    .then(documents => {
      res.status(200).json({
        message: 'Presidiums fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Presidium.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Presidium fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, multer({storage: storage}).single('file'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Presidium({
    postType: req.body.postType,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    file: url + '/images/' + req.file.filename,
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Presidium added successfully',
      post: {
        _id: result._id,
        postType: result.postType,
        name: result.name,
        position: result.position,
        email: result.email,
        file: result.file
      }
    });
  });
});

router.put('/:id',checkAuth, multer({storage: storage}).single('file'), (req,res,next) => {
  let filePath = req.body.file;
  if(req.file) {
    const url = req.protocol + '://' + req.get('host');
    filePath = url + '/images/' + req.file.filename;
  }

  const post = new Presidium({
    _id: req.body._id,
    postType: req.body.postType,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    file: filePath,
  })
  Presidium.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Presidium updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Presidium.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Presidium deleted successfully'
    });
  });
});

module.exports = router;
