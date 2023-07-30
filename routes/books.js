const express = require("express");
const router = express.Router();
const booksCtrl = require("../controllers/books");
const multer = require("../middleware/multer.config"); 

router.post ('/', booksCtrl.createBook); 
router.put('/:id', booksCtrl.modifyBook); 
router.delete('/:id',booksCtrl.deleteBook);
router.get('/:id', booksCtrl.getOneBook);
router.get('/', booksCtrl.getAllBook);

module.exports = router;