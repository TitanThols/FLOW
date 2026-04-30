const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const authController = require('../controllers/authController');

// All asset routes require authentication
router.use(authController.protect);

router
  .route('/')
  .get(assetController.getAllAssets)
  .post(assetController.createAsset);

router
  .route('/:id')
  .get(assetController.getAssetById)
  .patch(assetController.updateAsset)
  .delete(assetController.deleteAsset);

module.exports = router;
