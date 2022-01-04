/********************************
  profile photo
********************************/
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { winLogger } = require("../../../loggers");

module.exports = multer({
  /*********************
    storage
  *********************/
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      winLogger.info("UPLOADER:LICENSE: stroing the file on the server");
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      // const random = Math.round(Math.random() * 1000000000000000000);
      winLogger.info("UPLOADER:LICENSE: renaming the file");
      cb(null, `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`);
    }
  }),
  // add file compressions middleware
  /*********************
    limits
  *********************/
  limits: {
    fileSize: 2000000
  },
  /*********************
    fileFilter
  *********************/
  fileFilter(req, file, cb) {
    winLogger.info("UPLOADER:LICENSE: filtering files with proper extensions");
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf)/))
      return cb(
        new Error(
          "plesae choose a file with the appropriate extension: jpeg, jpg, png, or pdf"
        )
      );
    cb(null, true);
  }
}).single("license");
