const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app){
    app.use(helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", 'https://vidly-full.vercel.app', 'ws://localhost:42877/']
          }
        }
      }));
    app.use(compression());
}