const Book = require ('../models/books');


exports.createBook = (req, res) =>{
    delete req.body.userId;
    const book = new Book({
    ...req.body
    })
    book.save()
    .then(() => res.status (201).json({message: 'livre ajouté'}))
    .catch (error => res.status (400).json ({error}));
    }

exports.modifyBook = (req, res, next) => {
    Book.updateOne({userId: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ userId: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.getOneBook = (req, res, next) => {
    Book.findOne({ userId: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  }

  exports.getAllBook=(req, res) => {
    Book.find ()
    .then (books => res.status (200).json (books))
    .catch (error => res.status (400).json ({error}));
}
