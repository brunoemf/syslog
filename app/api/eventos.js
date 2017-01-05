var mongoose = require('mongoose');
var restify = require('restify');
var clienteBisSerttel = restify.createJsonClient({
   url:'http://bis.serttel.com.br'
});


var api = {};
var modelEvento = mongoose.model('Evento');

const claro = "895505",
      vivo = "895511",
      vivo2 = "895510",
      nextel1 = "23",
      nextel2 = "82",
      tim = "895502"

api.insere = function(req,res) {

    // Validation
    console.log(req.body);
    req.assert("CodCentroCusto", "Erro de validação do Centro de Custo").notEmpty().isInt().isNumeric().isLength({min:6,max:9});
    req.assert("TipoAparelhoCod", "Erro de validação do Tipo de Aparelho").notEmpty().isLength({min:3,max:3});
    req.assert("NomeDispositivo", "Erro de validação na descrição do aparelho").notEmpty();
    req.assert("latitude", "Erro de validação da latitude").notEmpty();
    req.assert("longitude", "Erro de validação da longitude").notEmpty();
    req.assert("SIMSerialNumber", "Erro de validação do SIM").notEmpty().isLength({min:12,max:26});




    var errors = req.validationErrors();

    if (errors){
        console.log("Erros de validação encontrados");
        res.status(400).send(errors);
        return;
    }
    // End of validation

    var evento = req.body;

    let sn = evento.SIMSerialNumber.toString();

    if (sn.substring(0,6) == claro) {
      evento.operadora = "Claro";
   } else if (sn.substring(0,6) == vivo || sn.substring(0,6) == vivo2) {
      evento.operadora = "Vivo";
   } else if (sn.substring(0,2) == nextel1 || sn.substring(0,2) == nextel2) {
      evento.operadora = "Nextel";
   } else if (sn.substring(0,6) == tim) {
      evento.operadora = "TIM";
   } else {
      evento.operadora = "";
   }

    evento.lastUpdate = new Date;
    modelEvento.create(evento)
      .then(function (result) {
         res.status(201).json(result);

      },function (error) {
         res.status(500).json(error);
      });

};

api.lista = function (req,res) {


   // Verificar se o Centro de Custo informado é válido

   clienteBisSerttel.get('http://bis.serttel.com.br/chips/json.php',function (erro,request,response,retorno) {
      //console.log("Obtendo relação de centro de custos...");
      //console.log(retorno);
   });

   modelEvento.find()
    .then(function(result) {
       console.log('Recuperando devices...');
       res.status(200).json(result);
    }), function(error) {
       console.log(error);
       res.status(500).json(error);
    };


}

// Retorna o Objeto API.
module.exports = api;
