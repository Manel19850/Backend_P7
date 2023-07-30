const mongoose = require ('mongoose');


const bookSchema = mongoose.Schema({
  userId: {type:String},
  title: { type: String},
  auteur: { type: String },
  imageUrl: { type: String },
  year: { type: Number},
  genre: { type: String },
  rating:[
    {userId:{type:String},
    grade: {type: Number}}
  ],
  averageRating:{ type: Number },
});

module.exports = mongoose.model('Books', bookSchema);