const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app){
    app.use(helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", 'http://127.0.0.1:8000', 'ws://localhost:42877/']
          }
        }
      }));
    app.use(compression());
}