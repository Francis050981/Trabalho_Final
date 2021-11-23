'use strict'
class Register {
  get rules () {
    return {
      name:'required',
      password:'required|min:8',
      email:'required|email|unique:users',
      passwordMail:'required'
    }
  }

  get messages(){
    return{
      'name.required':'Nome completo é obrigatório.',
      'password.required':'Senha é obrigatória.',
      'password.min':'Senha deve conter no mínimo 8 caracteres.',
      'email.required':'Email é obrigatório.',
      'email.unique':'Email já cadatrado.',
      'passwordMail.required':'Senha do seu e-mail é obrigatória.'
    }
  }
}
module.exports = Register
