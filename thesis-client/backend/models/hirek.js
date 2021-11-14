const mongoose = require('mongoose');

const hirekSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  date: { type: String, required: true },
  files: { type: Array }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Post', hirekSchema);

//Amikor elmentünk egy új hírt, akkor adatbázisban kerül elmentésre - az adatbázisban egy olyan kollekciót fog ennek létrehozni
//automatikusan, ami a séma nevének a többes száma, kisbetűvel (pl.: Post -> posts)
