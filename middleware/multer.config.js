const multer = require('multer');
  
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, name + "_" + Date.now() + ".webp");
  },
});

const upload = multer({ storage: storage }).single("image");

module.exports = upload;