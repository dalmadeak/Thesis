const http = require('http');
const app = require('./backend/app');
const debug = require('debug')('node-angular');

const server = http.createServer((req, res) => {
  res.end('This is my response');
});

const port = (process.env.PORT || '3000');

server.listen(port);
