const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const hirekRoutes = require('./routes/hirek')
const ulesekRoutes = require('./routes/ulesek')
const palyazatokRoutes = require('./routes/palyazatok')
const beszamolokRoutes = require('./routes/beszamolok')
const hatarozatokRoutes = require('./routes/hatarozatok')
const haviBeszamolokRoutes = require('./routes/havi-beszamolok')
const jegyzokonyvekRoutes = require('./routes/jegyzokonyvek')

const sorompoRoutes = require('./routes/sorompo')
const belepokartyaRoutes = require('./routes/belepokartya')

const irodaRoutes = require('./routes/iroda')
const bufekRoutes = require('./routes/bufek')


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
app.use('/api/hirek', hirekRoutes);

/* BIZOTTSÁGI ÜLÉSEK */
app.use('/api/ulesek', ulesekRoutes);

/* BESZÁMOLÓK */
app.use('/api/beszamolok', beszamolokRoutes);

/* JEGYZŐKÖNYVEK */
app.use('/api/jegyzokonyvek', jegyzokonyvekRoutes);

/* PÁLYÁZATOK */
app.use('/api/palyazatok', palyazatokRoutes);

/* HAVI BESZÁMOLÓK */
app.use('/api/havi-beszamolok', haviBeszamolokRoutes);

/* HATÁROZATOK */
app.use('/api/hatarozatok', hatarozatokRoutes);


/* SOROMPÓ REGISZTRÁCIÓK */
app.use('/api/sorompo', sorompoRoutes);

/* BELÉPŐKÁRTYA REGISZTRÁCIÓK */
app.use('/api/belepokartya', belepokartyaRoutes);


/* IRODA NYITVATARTÁSOK */
app.use('/api/iroda', irodaRoutes);

/* BÜFÉK, ÉTKEZŐK */
app.use('/api/bufek', bufekRoutes);

module.exports = app;
