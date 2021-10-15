'use strict'
const MsgWhat = use('App/Models/MsgWhat')

class MsgWhatController {

    async index ({ view }) {
        const Mensagem = await MsgWhat.all()
        return view.render('index', {
            Mensagens: Mensagem.toJSON()
        })
    }

    async create ({ view }) {
        return view.render('Mensagens.create-msg-email')
    }

    async visualiza ({ view }) {
        const Mensagem = await MsgWhat.all()
        return view.render('Mensagens.visualiza-msg-whats', {
            Mensagens: Mensagem.toJSON(),
        })   
    }

    async store ({ request,auth,session, response }) {
        const MensagemW = await MsgWhat.create({
            user_id: auth.user.id,
            username: auth.user.username,
            titulo_msg_whats: request.input('titulo_msg_whats'),
            msg_txt_whats: request.input('msg_txt_whats')
        })
        session.flash({ 'successmessage': 'Mensagem incluída com sucesso!'})
        return response.redirect('/')
    }

    async show ({ params, view }) {
        const Mensagem = await MsgWhat.find(params.id)
        return view.render('Mensagens.view-msg-whats', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async edit ({ params, view }) {
        const Mensagem = await MsgWhat.find(params.id)
        return view.render('Mensagens.edit-msg-whats', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async confirm ({ params, view }) {
        const Mensagem = await MsgWhat.find(params.id)
        return view.render('Mensagens.edit-msg-whats-confirma', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async update ({ params, request, response, session }) {
        const Mensagem = await MsgWhat.find(params.id)
        //Mensagem.titulo_msg_email = request.input('titulo_msg_email')
        Mensagem.msg_txt_whats = request.input('msg_txt_whats')
        await Mensagem.save()
        session.flash({'successmessage': 'Atualização registrada!'})
        return response.redirect('/')
    }

    async destroy ({ params, response, session }) {
        const Mensagem = await MsgWhat.find(params.id)
        await Mensagem.delete()
        session.flash({'successmessage': 'Mensagem deletada!'})
        return response.redirect('/')
    }
}

module.exports = MsgWhatController
