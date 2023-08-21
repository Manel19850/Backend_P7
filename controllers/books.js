const Book = require ('../models/books');
const auth = require ('../middleware/auth');
const fs = require ('fs');

/* Créer un livre */
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  console.log(req.body.book)
    const book = new Book({
    ...bookObject,
    userId: req.auth.userId,

    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename}`,
    });
    book.save()
    .then(() => res.status (201).json({message: 'livre ajouté'}))
    .catch (error => res.status (400).json ({error}));
    };

    /* Modifier un livre */

    exports.modifyBook = (req, res) => {
      const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    
      delete bookObject.userId;
    
      Book.findOne({ _id: req.params.id })
        .then((book) => {
          if (book.userId !== req.auth.userId) {
            res.status(401).json({ message: 'Not authorized' });
          } else {
            Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Livre modifié!' }))
              .catch(error => res.status(500).json({ error }));
          }
        })
        .catch(error => res.status(400).json({ error }));
    };

/* Supprimer un livre */
    exports.deleteBook = (req, res, next) => {
      Book.findOne({ _id: req.params.id })
        .then((book) => {
          if (book.userId != req.auth.userId) {
            res.status(403).json({ message: "403: unauthorized request" });
          } else {
            Book.deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: "Deleted!" });
    
                const filename = book.imageUrl.split("/images/")[1];
    
                fs.unlink(`images/${filename}`, (err) => {
                  if (err) console.log(err);
                });
              })
              .catch((error) => res.status(401).json({ error }));
          }
        })
        .catch((error) => res.status(500).json({ error }));
    };
    
/* Récupérer un livre */
  exports.getOneBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  }

  /* Récupérer tous les livres  */
  exports.getAllBook=(req, res) => {
    Book.find ()
    .then (book => res.status (200).json (book))
    .catch (error => res.status (400).json ({error}));
}

 // Noter le livre

 exports.ratingBook = (req, res, next) => {
  const updatedRating = {
    userId: req.auth.userId,
    grade: req.body.rating,
  };

  if (updatedRating.grade < 0 || updatedRating.grade > 5) {
    return res.status(400).json({ message: "rating must be between 0 and 5" });
  }

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.ratings.find((r) => r.userId === req.auth.userId)) {
        return res
          .status(400)
          .json({ message: "User already voted for this book" });
      } else {
        book.ratings.push(updatedRating);

        book.averageRating =
          (book.averageRating * (book.ratings.length - 1) +
            updatedRating.grade) /
          book.ratings.length;
        return book.save();
      }
    })
    .then((updatedBook) => res.status(201).json(updatedBook))
    .catch((error) => res.status(400).json({ error }));
};

// Récupération des trois meilleurs livres

exports.getBestRatings = (req, res, next) => {
  Book.find()
    // décroissant
    .sort({ averageRating: -1 })

    .limit(3)

    .then((bestBooks) => res.status(200).json(bestBooks))
    .catch((error) => res.status(400).json({ error }));
};