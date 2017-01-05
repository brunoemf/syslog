var mongoose = require('mongoose');


var api = {};
var modelEvento = mongoose.model('Evento');



api.insere = function(req,res) {

    var evento = req.body;

    modelEvento.create(evento)
      .then(function (result) {
         res.status(201).json(result);
      },function (error) {
         res.status(500).json(error);
      });

};

api.lista = function (req,res) {

   modelEvento.find()
    .then(function(result) {
       console.log('Recuperando Logs...');
       res.status(200).json(result);
    }), function(error) {
       console.log(error);
       res.status(500).json(error);
    };

}

// Retorna o Objeto API.
module.exports = api;
