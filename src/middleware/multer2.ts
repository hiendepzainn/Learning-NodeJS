import multer from "multer";
import path from "path";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "public/images/product");
    } else if (file.fieldname === "model") {
      cb(null, "public/images/model");
    } else {
      cb(new Error("Invalid field name"), "");
    }
  },
  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function
) => {
  // upload ảnh
  if (file.fieldname === "image") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      return cb(null, true);
    }
    return cb(new Error("Image must be JPG or PNG"));
  }

  // upload model 3D
  if (file.fieldname === "model") {
    if (path.extname(file.originalname) === ".glb") {
      return cb(null, true);
    }
    return cb(new Error("Model must be .glb"));
  }

  cb(new Error("Unknown upload field"));
};

const uploadsMiddleware = () => {
  return multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
    fileFilter,
  }).fields([
    { name: "image", maxCount: 1 },
    { name: "model", maxCount: 1 },
  ]);
};

export default uploadsMiddleware;
