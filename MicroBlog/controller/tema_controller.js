const Tema = require("../model/tema")

exports.listar = (req, res) => {
  Tema.find({}, (err, Temas) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(Temas);
  })
}


exports.inserir = (req, res) => {
    let novoTema = new Tema(req.body);
    novoTema.save((err, Tema) => {
      if(err) {
        res.send(err);
      }
      res.status(201).json(Tema);
    })
  }

  exports.atualizar = (req, res) => {
    let id = req.params.id;
    let temaAtualizar = req.body;

    Tema.findOneAndUpdate({ _id: id }, temaAtualizar, { new: true }, (err, TemaAtual) => {
      if(err){
          res.send(err);
      }
      res.json(TemaAtual);
  });
}

exports.deletar = (req, res) => {
  let id = req.params.id;
  Tema.findOneAndDelete({ _id: id }, (err, TemaAtual) => {
      if(err){
          res.send(err);
      }
      res.json(TemaAtual);
  });
}

exports.buscarPorId = (req, res) => {
  let id = req.params.id;
  Tema.findById(id, (err, Tema) => {
      if(err)
          res.status(500).send(err);        
      res.json(Tema);
  });    
}

