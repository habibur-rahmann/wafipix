import multer from "multer";
import fs from "fs";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadsDir = "../temp/uploads";
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }
//     cb(null, uploadsDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// export const upload = multer({ storage: storage });

const storage = multer.memoryStorage();
export const upload = multer({ storage });
