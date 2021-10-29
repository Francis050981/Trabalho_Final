const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// OU const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const TemaSchema = new Schema({
    nome: String,
}, 
{
    versionKey: false    
});

module.exports = mongoose.model("Tema", TemaSchema);