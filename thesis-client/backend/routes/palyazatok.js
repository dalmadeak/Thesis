const express = require('express');
const multer = require("multer");
const checkAuth = require('../middleware/auth');

const Application = require('../models/palyazatok');

const router = express.Router();

const MIME_TYPE_MAP = {
  'application/pdf': 'pdf',
  'application/zip': 'zip',
  'application/x-zip-compressed': 'zip',
}

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid type');
    if (isValid){
      error = null
    }
    cb(error, "files/palyazatok");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extention = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extention);
  }
});


router.get('', (req,res,next) => {
  Application.find()
    .then(documents => {
      res.status(200).json({
        message: 'Applications fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req,res,next) => {
  Application.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Application fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, multer({storage: storage}).single('file'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Application({
    postType: req.body.postType,
    title: req.body.title,
    date: req.body.date,
    file: url + '/files/palyazatok/' + req.file.filename,
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Application added successfully',
      post: {
        _id: result._id,
        postType: req.body.postType,
        title: req.body.title,
        date: req.body.date,
        file: result.file,
      }
    });
  });
});

router.put('/:id',checkAuth, multer({storage: storage}).single('file'), (req,res,next) => {
  let filePath = req.body.file;
  if(req.file) {
    const url = req.protocol + '://' + req.get('host');
    filePath = url + '/files/palyazatok/' + req.file.filename;
  }
  const post = new Application({
    _id: req.body._id,
    postType: req.body.postType,
    title: req.body.title,
    date: req.body.date,
    file: filePath
  })
  Application.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Application updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Application.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Application deleted successfully'
    });
  });
});

module.exports = router;
