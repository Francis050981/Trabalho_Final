'use strict'
const Upload = use('App/Models/Upload')
const Helpers = use('Helpers')
const fs = require('fs')
const SpreadSheet = use('SpreadSheet')
const xlsx = require('xlsx')
var conteudo = 0;

class UploadController {

  async index ({ view }) {
    const upload = await Upload.all()
    return view.render('index', {
      uploads: upload.toJSON()
    })
  }

  async create ({ view }) {
    return view.render('uploads.create-upload')
  }

  async mostraDados ({ view }) {
    return view.render('uploads.mostra-dados')
  }

  async mostraDados2 ({ view }) {
    return view.render('uploads.mostra-dados2')
  }

  async mostraDados3 ({ view }) {
    return view.render('uploads.mostra-dados3')
  }

  async mostraDados4 ({ view }) {
    return view.render('uploads.mostra-dados4')
  }

  async store ({ view, request,auth, session, response }) {

    const BaseContatos = request.file('uploadBase');
    await BaseContatos.move(Helpers.publicPath('./baseContatos'),{
      name: 'baseContatos.xlsx',
      overwrite: true, // overwrite in case of conflict
    });
    var workbook = xlsx.readFile('./public/baseContatos/baseContatos.xlsx');
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var conteudo = xlsx.utils.sheet_to_json(worksheet);
    fs.writeFileSync('./public/baseContatos/baseContatos.json', JSON.stringify(conteudo));
    //session.flash({ 'successmessage': 'Upload realizado com sucesso'});
    return view.render('uploads.create-upload');
    //return view.render('/index');
  }
}

module.exports = UploadController