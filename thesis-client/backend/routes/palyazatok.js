const express = require('express');
const multer = require("multer");

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
    console.log(file.mimetype)
    let error = new Error('Invalid type');
    if (isValid){
      error = null
    }
    cb(error, "backend/files/palyazatok");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extention = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extention);
  }
});


router.get('', (req,res,next) => {
  Application.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Applications fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
router.get('/:id', (req,res,next) => {
  Application.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Application fetched successfully',
        post: fetchedPost
      });
    });
});

router.post('', multer({storage: storage}).single('file'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Application({
    postType: req.body.postType,
    title: req.body.title,
    date: req.body.date,
    file: url + '/files/palyazatok/' + req.file.filename,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
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

//put - completely replace old resource with new one, patch - update resource
router.put('/:id', multer({storage: storage}).single('file'), (req,res,next) => {
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

router.delete('/:id', (req, res, next) => {
  Application.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Application deleted successfully'
    });
  });
});

module.exports = router;
