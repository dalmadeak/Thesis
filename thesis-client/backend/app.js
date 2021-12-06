const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./routes/auth')
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
const kozeletikRoutes = require('./routes/kozeletik')
const elnoksegRoutes = require('./routes/elnokseg')
const kabinetRoutes = require('./routes/kabinet')
const kuldottgyulesRoutes = require('./routes/kuldottgyules')

mongoose.connect("mongodb+srv://elnok:xtiV4hKL05OqaLbM@cluster0.pz2bf.mongodb.net/ikhokDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('Sikeres csatlakozás az adatbázishoz!')
  })
  .catch(() => {
    console.log('Sikertelen csatlakozás.');
  });

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));
app.use(bodyParser.json({limit: '50mb'}));

//Statikus hozzáférés a képek mappához
app.use('/images', express.static(path.join('images')));

//Statikus hozzáférés a fájlok mappához
app.use('/files', express.static(path.join('files')));

//Statikus hozzáférés az Angular mappához
app.use('/', express.static(path.join(__dirname, 'angular')));


/* AUTENTIKÁCIÓ */
app.use('/api/auth', authRoutes);

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

/* KÖZÉLETI ÖSZTÖNDÍJAK */
app.use('/api/kozeletik', kozeletikRoutes);

/* ELNÖKSÉG */
app.use('/api/elnokseg', elnoksegRoutes);

/* KABINET */
app.use('/api/kabinet', kabinetRoutes);

/* KÜLDÖTTGYŰLÉS */
app.use('/api/kuldottgyules', kuldottgyulesRoutes);

app.use((req,res,next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
