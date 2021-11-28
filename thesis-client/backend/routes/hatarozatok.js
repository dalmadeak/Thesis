const express = require('express');
const multer = require("multer");
const checkAuth = require('../middleware/auth');

const Decision = require('../models/hatarozatok');

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
    cb(error, "files/hatarozatok");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extention = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extention);
  }
});

router.get('', (req,res,next) => {
  Decision.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Decisions fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Decision.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Decision fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('',checkAuth, multer({storage: storage}).single('file'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Decision({
    postType: req.body.postType,
    committee: req.body.committee,
    title: req.body.title,
    number: req.body.number,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    mandate: req.body.mandate,
    vote: req.body.vote,
    date: req.body.date,
    file: url + '/files/hatarozatok/' + req.file.filename,
  });
  post.save().then( result => {
    res.status(201).json({
      message: 'Decision added successfully',
      post: {
        _id: result._id,
        postType: result.postType,
        committee: result.committee,
        title: result.title,
        number: result.number,
        decisionDate: result.decisionDate,
        content: result.content,
        mandate: result.mandate,
        vote: result.vote,
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
    filePath = url + '/files/hatarozatok/' + req.file.filename;
  }
  const post = new Decision({
    _id: req.body._id,
    postType: req.body.postType,
    committee: req.body.committee,
    title: req.body.title,
    number: req.body.number,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    mandate: req.body.mandate,
    vote: req.body.vote,
    date: req.body.date,
    file: filePath
  })
  Decision.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Decision updated successfully'
    });
  });
});

router.delete('/:id',checkAuth, (req, res, next) => {
  Decision.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Decision deleted successfully'
    });
  });
});

module.exports = router;
