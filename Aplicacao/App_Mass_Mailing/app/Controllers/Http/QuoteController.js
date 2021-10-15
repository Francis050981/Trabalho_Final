'use strict'
const Quote = use('App/Models/Quote')

class QuoteController {

  async index ({ view }) {
    const quote = await Quote.all()
    return view.render('index', {
      quotes: quote.toJSON()
    })
  }

  async create ({ view }) {
    return view.render('quotes.create-quote')
  }

  async store ({ request,auth,session, response }) {
    const quote = await Quote.create({
      user_id: auth.user.id,
      username: auth.user.username,
      body: request.input('body')
    })
    session.flash({ 'successmessage': 'Anotação incluída com sucesso!'})
    return response.redirect('/')
  }

  async show ({ params, view }) {
    const quote = await Quote.find(params.id)
    return view.render('quotes.view-quote', {
      quote: quote.toJSON()
    })
  }

  async edit ({ params, view }) {
    const quote = await Quote.find(params.id)
    return view.render('quotes.edit-quote', {
      quote: quote.toJSON()
    })
  }

  async update ({ params, request, response, session }) {
    const quote = await Quote.find(params.id)
    quote.body = request.input('body')
    await quote.save()
    session.flash({'successmessage': 'Atualização registrada!'})
    return response.redirect('/')
  }

  async destroy ({ params, response, session }) {
    const quote = await Quote.find(params.id)
    await quote.delete()
    session.flash({'successmessage': 'Anotação deletada!'})
    return response.redirect('/')
  }
}
module.exports = QuoteController