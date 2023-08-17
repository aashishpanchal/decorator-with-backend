import multer from "multer";

const fileSize = 5 * 1024 * 1024; // Limit file size to 5 MB
const storage = multer.memoryStorage();

// upload middleware
export const uploadFile = multer({
  storage,
  limits: { fileSize },
});
