const mongoose = require ('mongoose');


const bookSchema = mongoose.Schema({
  userId: {type:String,required: true},
  title: { type: String,required: true},
  auteur: { type: String,required: true },
  imageUrl: { type: String,required: true },
  year: { type: Number,required: true},
  genre: { type: String,required: true },
  rating:[
    {userId:{type:String},
    grade: {type: Number}}
  ],
  averageRating:{ type: Number },
});

module.exports = mongoose.model('Books', bookSchema);