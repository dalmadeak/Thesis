const express = require('express');
const multer = require("multer");
const checkAuth = require('../middleware/auth');

const Record = require('../models/jegyzokonyvek');

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
    cb(error, "files/jegyzokonyvek");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extention = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extention);
  }
});

router.get('', (req,res,next) => {
  Record.find()
    .then(documents => {
      res.status(200).json({
        message: 'Record fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Record.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Record fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, multer({storage: storage}).single('file'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Record({
    postType: req.body.postType,
    committee: req.body.committee,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    date: req.body.date,
    file: url + '/files/jegyzokonyvek/' + req.file.filename,
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Record added successfully',
      post: {
        _id: result._id,
        postType: result.postType,
        committee: result.committee,
        title: result.title,
        decisionDate: result.decisionDate,
        date: result.date,
        file: result.file
      }
    });
  });
});

router.put('/:id',checkAuth, multer({storage: storage}).single('file'), (req,res,next) => {
  let filePath = req.body.file;
  if(req.file) {
    const url = req.protocol + '://' + req.get('host');
    filePath = url + '/files/jegyzokonyvek/' + req.file.filename;
  }
  const post = new Record({
    _id: req.body._id,
    postType: req.body.postType,
    committee: req.body.committee,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    date: req.body.date,
    file: filePath
  })
  Record.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Record updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Record.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Record deleted successfully'
    });
  });
});

module.exports = router;
