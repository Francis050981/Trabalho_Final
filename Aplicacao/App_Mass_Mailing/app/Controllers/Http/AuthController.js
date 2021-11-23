'use strict'
const User = use('App/Models/User')
class AuthController {

    loginView({ view }) {
        return view.render('auth.login')
    }
    registrationView({ view }) {
        return view.render('auth.register')
    }

    async postLogin({ request, auth, response}) {
        await auth.attempt(request.input('email'), request.input('password'))
        return response.route('index')
    }

    async postRegister({ request, session, response }) {
        const user = await User.create({
            username: request.input('name'),
            password: request.input('password'),
            email: request.input('email'),
            passwordMail: request.input('passwordMail')

        })
        session.flash({ successmessage: 'Usuário incluído com sucesso!'})
        //return response.route('login.create');
        return response.route('index');

    }

    async logout ({ auth, response }) {
        await auth.logout()
        return response.route('/')
    }
}
module.exports = AuthController