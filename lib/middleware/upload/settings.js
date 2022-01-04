const path = require("path");
const multer = require("multer");
const { handleApiError } = require("../../handlers");

// /********************************
//   storage
// ********************************/
//
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     const { user } = req;
//     setUploadDestination(req, file, cb);
//   },
//   filename: (req, file, cb) => {
//     // console.log(file);
//     const random = Math.round(Math.random() * 1000000000000);
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${random}${path.extname(
//         file.originalname
//       )}`
//     );
//   }
// });
//
// /********************************
//   multerInstance
// ********************************/
//
// const multerInstance = multer({
//   storage,
//   limits: {
//     fileSize: 2000000
//   },
//   fileFilter(req, file, cb) {
//     // console.log(req.files);
//     if (!file.originalname.match(/\.(jp?.g|png)/))
//       return cb(
//         new Error(
//           "plesae choose a file with the appropriate extension: jpeg, jpg, or png"
//         )
//       );
//     cb(undefined, true);
//   }
// }).fields([...uploadFields]);
//
// /********************************
//   upload
// ********************************/
// const upload = (req, res, next) => {
//   multerInstance(req, res, error => {
//     // console.log("error ", error);
//
//     if (error instanceof multer.MulterError) {
//       // console.error(error);
//       // consola.error("multer error: ", error);
//       // handleApiError(res, 500, error.message);
//     } else {
//       // consola.error("unknown error: ", error);
//       // console.error(error);
//       // handleApiError(res, 500, error.message);
//     }
//   });
//
//   // try {
//   //   // return multerInstance;
//   //
//   // } catch (e) {
//   //   console.log(".............nvg");
//   // }
// };

// *******************************

/********************************
  upload middleware settings
********************************/
//
// const setUploadDestination = (req, file, cb) => {
//   const { user } = req;
//   switch (file.fieldname) {
//     case "profile_photo":
//       cb(null, "uploads/profile_photos");
//     default:
//       cb(null, "uploads/");
//   }
// };
//
// // *********************************************************
//
// const uploadFields = [
//   {
//     name: "profile_photo",
//     maxCount: 1
//   }
// ];
//
// module.exports = { setUploadDestination, uploadFields };
