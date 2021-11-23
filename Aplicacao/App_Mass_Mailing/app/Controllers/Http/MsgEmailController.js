'use strict'

const MsgEmail = use('App/Models/MsgEmail');
const nodemailer = require('nodemailer');

class MsgEmailController {

    async index ({ view }) {
        const Mensagem = await MsgEmail.all()
        return view.render('index', {
            Mensagens: Mensagem.toJSON()
        })
    }

    async create ({ view }) {
        return view.render('Mensagens.create-msg-email')
    }

    async enviaEmail ({ view }) {
        const Mensagem = await MsgEmail.all()
        return view.render('EnvioEmail.envia-email',{
            Mensagens: Mensagem.toJSON()
        })
    }

    async configEmail ({ view }) {
        const Mensagem = await MsgEmail.all()
        return view.render('EnvioEmail.config-email',{
            Mensagens: Mensagem.toJSON()
        })
    }
    

    async visualiza ({ view }) {
        const Mensagem = await MsgEmail.all()
        return view.render('Mensagens.visualiza-msg-email', {
            Mensagens: Mensagem.toJSON(),
        })   
    }

    async store ({ request,auth,session, response }) {
        const Mensagem = await MsgEmail.create({
            user_id: auth.user.id,
            username: auth.user.username,
            titulo_msg_email: request.input('titulo_msg_email'),
            msg_email: request.input('msg_email')
        })
        session.flash({ 'successmessage': 'Mensagem incluída com sucesso!'})
        return response.redirect('/')
    }

    async show ({ params, view }) {
        const Mensagem = await MsgEmail.find(params.id)
        return view.render('Mensagens.view-msg-email', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async edit ({ params, view }) {
        const Mensagem = await MsgEmail.find(params.id)
        return view.render('Mensagens.edit-msg-email', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async confirm ({ params, view }) {
        const Mensagem = await MsgEmail.find(params.id)
        return view.render('Mensagens.edit-msg-email-confirma', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async update ({ params, request, response, session }) {
        const Mensagem = await MsgEmail.find(params.id)
        //Mensagem.titulo_msg_email = request.input('titulo_msg_email')
        Mensagem.msg_email = request.input('msg_email')
        await Mensagem.save()
        session.flash({'successmessage': 'Atualização registrada!'})
        return response.redirect('/')
    }

    async destroy ({ params, response, session }) {
        const Mensagem = await MsgEmail.find(params.id)
        await Mensagem.delete()
        session.flash({'successmessage': 'Mensagem deletada!'})
        return response.redirect('/')
    }

    async send ({params, request, response, session}){
        const Mensagem = await MsgEmail.all()
        let testAccount = await nodemailer.createTestAccount();
        const recebeUserMail = request.input('remetente');
        const recebePassMail = request.input('senha');
        const recebeHost = request.input('smtp');
        const recebePorta = request.input('porta');
        const recebeDestinoMail = request.input('destinatario');
        const recebeRespMail = request.input('retornarPara');
        const recebeAssunto = request.input('assunto');
        const recebeBody = request.input('corpo');
        const recebedecriptar = request.input('senhaoculta');
        

        let transporter = nodemailer.createTransport({
            host: recebeHost,
            port: recebePorta,
            //service:'yahoo',
            secure: false, // true for 465, false for other ports
            auth: {
              user: recebeUserMail, // generated ethereal user
              pass: recebePassMail, // generated ethereal password
            },
        });

        const fs = require('fs');
        let rawdata = fs.readFileSync('public/baseContatos/baseContatos.json');
        let json = JSON.parse(rawdata);

        for(var i=0;i< json.length; i++){
            let info = await transporter.sendMail({
                from: recebeUserMail, // sender address
                //to: recebeDestinoMail, // list of receivers
                to: json[i].email,
                subject: recebeAssunto, // Subject line
                replyTo: recebeRespMail,
                text: recebeBody, // plain text body
                //html: "<b>Hello world?</b>", // html body
            });
        }
        session.flash({'successmessage': 'Grupo de e-mails enviado!'})
        return response.redirect('/')
    }
}

module.exports = MsgEmailController
