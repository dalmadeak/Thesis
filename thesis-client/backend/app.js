const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Post = require('./models/hirek');
const Decision = require('./models/hatarozatok');

// xtiV4hKL05OqaLbM
mongoose.connect("mongodb+srv://elnok:xtiV4hKL05OqaLbM@cluster0.pz2bf.mongodb.net/ikhokDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed.');
  });

//Ez itt azért kell, mert CORS error-t kapunk, ha a kliens és a szerver különböző host-on fut
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/* HÍREK MIDDLEWARES */
app.get('/api/hirek', (req,res,next) => {
  Post.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/hirek/:id', (req,res,next) => {
  Post.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Post fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/hirek', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
app.put('/api/hirek/:id', (req,res,next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Post updated successfully'
    });
  });
});

app.delete('/api/hirek/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Post deleted successfully'
    });
  });
});




/* BIZOTTSÁGI ÜLÉSEK */
app.get('/api/ulesek', (req,res,next) => {
  Meeting.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Meetings fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/ulesek/:id', (req,res,next) => {
  Meeting.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Meeting fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/ulesek', (req, res, next) => {
  const post = new Meeting({
    committee: req.body.committee,
    type: req.body.type,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Meeting added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
app.put('/api/ulesek/:id', (req,res,next) => {
  const post = new Meeting({
    _id: req.body._id,
    committee: req.body.committee,
    type: req.body.type,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    date: req.body.date,
    files: req.body.files,
  })
  Meeting.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Meeting updated successfully'
    });
  });
});

app.delete('/api/ulesek/:id', (req, res, next) => {
  Meeting.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Meeting deleted successfully'
    });
  });
});




/* BESZÁMOLÓK */
app.get('/api/beszamolok', (req,res,next) => {
  Report.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Reports fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/beszamolok/:id', (req,res,next) => {
  Report.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Report fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/beszamolok', (req, res, next) => {
  const post = new Report({
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Report added successfully',
      postId: result._id
    });
  });
});

/*
author: req.body.author,
    year: req.body.year,
    month: req.body.month,
    content: req.body.content,
    date: req.body.date,
*/

//put - completely replace old resource with new one, patch - update resource
app.put('/api/beszamolok/:id', (req,res,next) => {
  const post = new DeciReportsion({
    _id: req.body._id,
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  })
  Report.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Report updated successfully'
    });
  });
});

app.delete('/api/beszamolok/:id', (req, res, next) => {
  Report.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Report deleted successfully'
    });
  });
});



/* JEGYZŐKÖNYVEK */
app.get('/api/jegyzokonyvek', (req,res,next) => {
  Record.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Record fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/jegyzokonyvek/:id', (req,res,next) => {
  Record.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Record fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/jegyzokonyvek', (req, res, next) => {
  const post = new Record({
    committee: req.body.committee,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Record added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
app.put('/api/jegyzokonyvek/:id', (req,res,next) => {
  const post = new Record({
    _id: req.body._id,
    committee: req.body.committee,
    title: req.body.title,
    decisionDate: req.body.decisionDate,
    date: req.body.date,
    files: req.body.files
  })
  Record.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Record updated successfully'
    });
  });
});

app.delete('/api/jegyzokonyvek/:id', (req, res, next) => {
  Record.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Record deleted successfully'
    });
  });
});




/* PÁLYÁZATOK */
app.get('/api/palyazatok', (req,res,next) => {
  Application.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Applications fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/palyazatok/:id', (req,res,next) => {
  Application.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Application fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/palyazatok', (req, res, next) => {
  const post = new Application({
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Application added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
app.put('/api/palyazatok/:id', (req,res,next) => {
  const post = new Application({
    _id: req.body._id,
    title: req.body.title,
    date: req.body.date,
    files: req.body.files
  })
  Application.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Application updated successfully'
    });
  });
});

app.delete('/api/palyazatok/:id', (req, res, next) => {
  Application.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Application deleted successfully'
    });
  });
});




/* HAVI BESZÁMOLÓK */
app.get('/api/havi-beszamolok', (req,res,next) => {
  MonthlyReport.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Monthly Reports fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/havi-beszamolok/:id', (req,res,next) => {
  MonthlyReport.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Monthly Report fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/havi-beszamolok', (req, res, next) => {
  const post = new MonthlyReport({
    author: req.body.author,
    year: req.body.year,
    month: req.body.month,
    content: req.body.content,
    date: req.body.date,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Monthly Report added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
app.put('/api/havi-beszamolok/:id', (req,res,next) => {
  const post = new MonthlyReport({
    _id: req.body._id,
    author: req.body.author,
    year: req.body.year,
    month: req.body.month,
    content: req.body.content,
    date: req.body.date,
  })
  MonthlyReport.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Monthly Report updated successfully'
    });
  });
});

app.delete('/api/havi-beszamolok/:id', (req, res, next) => {
  MonthlyReport.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'MonthlyReport deleted successfully'
    });
  });
});




/* HATÁROZATOK */
app.get('/api/hatarozatok', (req,res,next) => {
  Decision.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Decisions fetched successfully',
        posts: documents
      });
    });
});

//Get post by id
app.get('/api/hatarozatok/:id', (req,res,next) => {
  Decision.find({_id: req.params.id})
    .then(fetchedPost => {
      res.status(200).json({
        message: 'Decision fetched successfully',
        post: fetchedPost
      });
    });
});

app.post('/api/hatarozatok', (req, res, next) => {
  const post = new Decision({
    committee: req.body.committee,
    number: req.body.number,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    mandate: req.body.mandate,
    vote: req.body.vote,
    date: req.body.date,
    files: req.body.files,
  });
  // Azért kell ez a then, mert frissítés nélkül az új post id-ja null marad
  post.save().then( result => {
    res.status(201).json({
      message: 'Decision added successfully',
      postId: result._id
    });
  });
});

//put - completely replace old resource with new one, patch - update resource
app.put('/api/hatarozatok/:id', (req,res,next) => {
  const post = new Decision({
    _id: req.body._id,
    committee: req.body.committee,
    number: req.body.number,
    decisionDate: req.body.decisionDate,
    content: req.body.content,
    mandate: req.body.mandate,
    vote: req.body.vote,
    date: req.body.date,
    files: req.body.files,
  })
  Decision.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Decision updated successfully'
    });
  });
});

app.delete('/api/hatarozatok/:id', (req, res, next) => {
  Decision.deleteOne({_id: req.params.id}).then(result => {
    res.status(201).json({
      message: 'Decision deleted successfully'
    });
  });
});


module.exports = app;
