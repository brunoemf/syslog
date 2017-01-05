var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventoSchema = Schema({

      "projeto":String,
      "aplicacao":String,
      "codigo":String,
      "msg":String
});

mongoose.model('Evento',eventoSchema);
