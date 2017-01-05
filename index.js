var app = require('./config/custom-express')();

app.listen(10895,function openConnection() {
  console.log("Servidor rodando...")
})
