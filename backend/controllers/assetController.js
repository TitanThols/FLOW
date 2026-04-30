const Asset = require('../models/assetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// POST /api/v1/assets
exports.createAsset = catchAsync(async (req, res, next) => {
  if (!req.body.sceneId) {
    return next(new AppError('Please provide a sceneId', 400));
  }

  const asset = await Asset.create({
    ...req.body,
    createdBy: req.user._id,
  });

  const populated = await Asset.findById(asset._id)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .populate('sceneId', 'name');

  res.status(201).json({
    status: 'success',
    data: { asset: populated },
  });
});

// GET /api/v1/assets?sceneId=...
exports.getAllAssets = catchAsync(async (req, res, next) => {
  const { sceneId } = req.query;

  if (!sceneId) {
    return next(new AppError('Please provide a sceneId query parameter', 400));
  }

  const assets = await Asset.find({ sceneId })
    .sort({ createdAt: -1 })
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .populate('sceneId', 'name');

  res.status(200).json({
    status: 'success',
    results: assets.length,
    data: { assets },
  });
});

// GET /api/v1/assets/:id
exports.getAssetById = catchAsync(async (req, res, next) => {
  const asset = await Asset.findById(req.params.id)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .populate('sceneId', 'name');

  if (!asset) {
    return next(new AppError('No asset found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { asset },
  });
});

// PATCH /api/v1/assets/:id
exports.updateAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .populate('sceneId', 'name');

  if (!asset) {
    return next(new AppError('No asset found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { asset },
  });
});

// DELETE /api/v1/assets/:id
exports.deleteAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndDelete(req.params.id);

  if (!asset) {
    return next(new AppError('No asset found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
