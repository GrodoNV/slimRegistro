
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Configuración de Almacenamiento Local ---
// Este es el "motor" de almacenamiento que usaremos por ahora.
// Guarda los archivos en el disco del servidor.

const localstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'src/uploads/images';
    // Crea el directorio si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Genera un nombre de archivo único para evitar colisiones
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// --- Futura Configuración para Almacenamiento en la Nube (Ej: AWS S3) ---
// const { S3Client } = require('@aws-sdk/client-s3');
// const multerS3 = require('multer-s3');
//
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });
//
// const cloudStorage = multerS3({
//   s3: s3,
//   bucket: process.env.S3_BUCKET_NAME,
//   acl: 'public-read', // Para que los archivos sean públicamente accesibles
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const extension = path.extname(file.originalname);
//     cb(null, 'case-images/' + uniqueSuffix + extension);
//   },
// });

// --- Filtro de Archivos ---
// Valida que el archivo subido sea una imagen.
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes (jpeg, png, gif).'), false);
  }
};

// --- Middleware de Multer ---
// Aquí se decide qué motor de almacenamiento usar. Por ahora, es 'localstorage'.
// Para cambiar a la nube, solo se cambiaría 'storage: localstorage' por 'storage: cloudStorage'.
const upload = multer({
  storage: localstorage, // <-- ¡Punto clave para la modularidad!
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Límite de 5MB por archivo
  }
});

module.exports = upload;
