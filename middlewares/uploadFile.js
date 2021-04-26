const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    return cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});

module.exports = upload = multer({ storage: storage });
