const express = require('express');
const router = express.Router();
const sceneController = require('../controllers/sceneController');
const authController = require('../controllers/authController');

// All scene routes require authentication
router.use(authController.protect);

router
  .route('/')
  .get(sceneController.getAllScenes)
  .post(sceneController.createScene);

router
  .route('/:id')
  .get(sceneController.getSceneById)
  .patch(sceneController.updateScene)
  .delete(sceneController.deleteScene);

module.exports = router;
