var app = require('./config/custom-express')();

app.listen(1205,function openConnection() {
  console.log("Servidor rodando...")
})
