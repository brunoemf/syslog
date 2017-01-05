
module.exports = function(app) {

    var api = app.api.eventos;


    app.post("/eventos",api.insere);

    app.get("/eventos",api.lista);
};
