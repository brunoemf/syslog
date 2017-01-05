var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventoSchema = Schema({

      CodCentroCusto:{type:Number,require:true},
      TipoAparelhoCod:{type:String,require: true},
      NomeDispositivo:{type:String,require: true},
      latitude:Number,
      longitude:Number,
      lastUpdate:{type:Date},
      SIMSerialNumber:{type:String,require:true,unique:true},
      operadora:String,
      Patrimonio:Number,
      smspdu:String,
      smssc:String
});

mongoose.model('Evento',eventoSchema);
