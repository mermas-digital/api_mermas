
const { Router } = require('express');
const express = require('express');
const PostController = require('../controllers/postController');
const verifyToken = require('./middleware');
const multer = require('multer');
const router = Router();

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a valid image file'))
    }
    cb(undefined, true)
  }
})

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API' });
});
router.post('/uploadImage', upload.array('images', 4), (req, res) => {
  try {
    res.send(req.files)
  }
  catch (e) {
    res.status(400).send(e)
  }
});
router.post('/createPost', verifyToken, PostController.createPost);
router.get('/getPost', PostController.getPost);



module.exports = router;