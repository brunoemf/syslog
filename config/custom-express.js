var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');


module.exports = function () {
  // body...
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());  

  consign({cwd:'app'})
    .include('persistencia')
    .then('models')
    .then('api')
    .then('rotas')
    .into(app);


  return app;
};
