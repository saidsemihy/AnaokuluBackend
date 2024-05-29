const { S3Client } = require('@aws-sdk/client-s3');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
//const galeryValidation = require('../../validations/galery.validation');
const galeryController = require('../../controllers/galery.controller');

const s3 = new S3Client({
  endpoint: 'https://fra1.digitaloceanspaces.com',
  credentials: {
    accessKeyId: 'DO00H4V76AFD6XEFL33C',
    secretAccessKey: 'm+H0lFRDm3RsyQIhvWZkmVg/MC7nZvK/7KYHLewzQz8',
  },
  region: 'fra1',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'project-storage',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const extension = file.mimetype.split('/')[1];
      req.body.type = extension;
      const file_name = file.originalname.split('.')[0];
      cb(null, file_name + '-' + Date.now().toString() + '.' + extension);
    },
  }),
});

const router = express.Router();

// v1/galery/
router
  .route('/')
  .post(auth('manageGalery'), upload.single('file'), galeryController.createMedia)
  .get(auth('getGalery'), galeryController.queryMedia);

// v1/galery/:mediaId
router.route('/:mediaId').delete(auth('manageGalery'), galeryController.deleteMedia);

module.exports = router;
