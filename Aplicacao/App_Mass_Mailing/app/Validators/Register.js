'use strict'
class Register {
  get rules () {
    return {
      name:'required',
      email:'required|email|unique:users',
      password:'required|min:8'
    }
  }

  get messages(){
    return{
      'name.required':'Nome completo é obrigatório.',
      'email.required':'Email é obrigatório.',
      'email.unique':'Email já cadatrado.',
      'password.required':'Senha é obrigatória.',
      'password.min':'Senha deve conter no mínimo 8 caracteres.'
    }
  }
}
module.exports = Register
