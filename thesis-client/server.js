const http = require('http');
const app = require('./backend/app');
const debug = require('debug')('node-angular');

/*const server = http.createServer((req, res) => {
  res.end('This is my response');
});

const port = (process.env.PORT || '3000');

server.listen(port);*/

const normalizedPort = val => {
  let port = parseInt(val, 10);

  if (isNaN(port))
    return val;

  if (port >= 0)
    return port;

  return false;
};

const onError = error => {
  if (error.syscall !== 'listen')
    throw error;

  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated priviledges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  debug('Listening on ' + bind);
};

const port = normalizedPort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
console.log('yay!')
