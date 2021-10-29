const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// OU const { Schema } = mongoose;

const PostSchema = new Schema({
    autor: String,
    titulo: String,
    postagem: String,
    tema: { type: Schema.Types.ObjectId, ref: 'Tema' },
}, 
{
    versionKey: false    
});

module.exports = mongoose.model("Post", PostSchema);