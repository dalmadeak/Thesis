const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Post = require('./models/hirek');


const posts = [
  {
    id: '0001',
    title: 'First backend post!',
    content: 'This is my first post from the backend!',
    date: '2021.11.11.'
  },
  {
    id: '0002',
    title: 'Second backend post!',
    content: 'This is my second post from the backend!',
    date: '2021.11.11.'
  },
  {
    id: '0001',
    title: 'First backend post!',
    content: 'This is my first post from the backend!',
    date: '2021.11.11.'
  },
  {
    id: '0002',
    title: 'Second backend post!',
    content: 'This is my second post from the backend!',
    date: '2021.11.11.'
  }
];

// xtiV4hKL05OqaLbM
mongoose.connect("mongodb+srv://elnok:xtiV4hKL05OqaLbM@cluster0.pz2bf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed.');
  });

//Ez itt azért kell, mert CORS error-t kapunk, ha a kliens és a szerver különböző host-on fut
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATH, DELETE, OPTIONS');
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Middlewares
app.get('/api/hirek', (req,res,next) => {
  Post.find() //returns all entries
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

app.post('/api/hirek', (req, res, next) => {
  const post = new Post({
    id: 69,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  });
  console.log(post);
  posts.push(post);
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

/*mongoose.connect("mongodb+srv://elnok:xtiV4hKL05OqaLbM@cluster0.pz2bf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed.');
  });

app.use(express.json());
*/


/*


app.get('/api/posts',(req, res, next) => {
  /*const posts = [
    {
      id: '00001',
      title: 'First post',
      content: 'First post\'s content from the server'
    },
    {
      id: '00002',
      title: 'Second post',
      content: 'Second post\'s content from the server'
    }
  ];
  Post.find() // returns all entries
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    });
});

app.post('/api/hirek', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(post);
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  })
})

app.get('/api/hirek',(req, res, next) => {
  /*const posts = [
    {
      id: '00001',
      title: 'First post',
      content: 'First post\'s content from the server'
    },
    {
      id: '00002',
      title: 'Second post',
      content: 'Second post\'s content from the server'
    }
  ];
  Post.find() // returns all entries
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    });
});*/

module.exports = app;
