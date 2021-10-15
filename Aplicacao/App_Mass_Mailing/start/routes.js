/*'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/*
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
//const Route = use('Route')
/*
Route.on('/').render('welcome')
*/

'use strict'
const Route = use('Route')
const nodemailer = require('nodemailer') 

Route.get('/','QuoteController.index').as('index')
Route.get('/register','AuthController.registrationView').as('register.create')
Route.post('/register-store','AuthController.postRegister').as('register.store').validator('Register')
Route.get('/login','AuthController.loginView').as('login.create')
Route.post('/login-store','AuthController.postLogin').as('login.store')
Route.get('/view-quote/:id','QuoteController.show').as('view.quote')
Route.get('/view-msg-email/:id','MsgEmailController.show').as('view.Mensagem')
Route.get('/view-msg-whats/:id','MsgWhatController.show').as('view.Whats')


Route.group(() => {
    Route.get('/create-quote','QuoteController.create').as('create.quote')
    Route.post('/store-quote','QuoteController.store').as('store.quote')
    Route.get('/edit-quote/:id','QuoteController.edit').as('edit.quote')
    Route.post('/update-quote/:id','QuoteController.update').as('update.quote')
    Route.get('/delete-quote/:id','QuoteController.destroy').as('delete.quote')

    Route.get('/create-msg-email','MsgEmailController.create').as('create.msg-email')
    Route.post('/store-msg-email','MsgEmailController.store').as('store.msg-email')
    Route.get('/visualiza-msg-email','MsgEmailController.visualiza').as('visualiza.msg-email')
    Route.get('/edit-msg-email/:id','MsgEmailController.edit').as('edit.msg-email')
    Route.get('/edit-msg-email-confirma/:id','MsgEmailController.confirm').as('confirma.msg-email')
    Route.post('/update-msg-email/:id','MsgEmailController.update').as('update.msg-email')
    Route.get('/delete-msg-email/:id','MsgEmailController.destroy').as('delete.msg-email')
    Route.get('/envia-email','MsgEmailController.enviaEmail').as('envia.envia-email')
    Route.post('/envia-email2','MsgEmailController.send').as('envia.send')

    Route.post('/store-msg-whats','MsgWhatController.store').as('store.msg-whats')
    Route.get('/visualiza-msg-whats','MsgWhatController.visualiza').as('visualiza.msg-whats')
    Route.get('/edit-msg-whats/:id','MsgWhatController.edit').as('edit.msg-whats')
    Route.get('/edit-msg-whats-confirma/:id','MsgWhatController.confirm').as('confirma.msg-whats')
    Route.post('/update-msg-whats/:id','MsgWhatController.update').as('update.msg-whats')
    Route.get('/delete-msg-whats/:id','MsgWhatController.destroy').as('delete.msg-whats')

    Route.post('/logout','AuthController.logout').as('logout')

    
}).middleware(['auth'])