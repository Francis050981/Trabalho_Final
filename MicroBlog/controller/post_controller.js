const Post = require("../model/post")

exports.listar = (req, res) => {
  Post.find({}, (err, posts) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(posts);
  })
}

exports.inserir = (req, res) => {
  let novoPost = new Post(req.body);
  novoPost.save((err, post) => {
    if(err) {
      res.send(err);
    }
    res.status(201).json(novoPost);
  })
}

exports.atualizar = (req, res) => {
  const id = req.params.id;
  const postAtualizar = req.body;

Produto.findByIdAndUpdate(id, postAtualizar, {new:true},
  (err, postAtualizado) => {
    if(err) {
      res.status(500).send(err);
    }
    if(postAtualizado) {        
      res.json(postAtualizado);
    }
    else {
      res.status(404).json({erro:"Post nao encontrado"});
    }
  })    
}






/*
exports.buscarPorId = (req, res) => {
  const id = req.params.id;
    Post.findById(id, (err, post) => {
      if(err) {
        res.status(500).send(err);
      }
      if(post) {        
        res.json(post);
      }
      else {
        res.status(404).json({erro:"Post nao encontrado"});
      }
    })
}
*/

exports.buscarPorId = (req, res) => {
  let id = req.params.id;
  Post.findById(id).populate('tema').exec((err, post) => {
      if(err)
          res.status(500).send(err);        
      res.json(post);
  });    
}






  exports.deletar  = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id, (err, postDeletado) =>{
      if(err) {
        res.status(500).send(err);
      }
      if(postDeletado) {        
        res.json(postDeletado);
      }
      else {
        res.status(404).json({erro:"Post nao encontrado"});
      }
    });
  }

  exports.procurar = (req, res) => {
    if(req.query && req.query.titulo){
      const paramTitulo = req.query.titulo;
      Post.find({titulo: paramTitulo}, (err, posts) => {
        if(err) {
          res.status(500).send(err);
        }
        if(posts && posts.length > 0) {        
          res.json(posts);
        }
        else {
          res.status(404).json({erro:"Post nao encontrado"});
        }
      })   
    }
    else{
      res.status(400).send({erro:"Faltou o parametro título"});
    }
  }