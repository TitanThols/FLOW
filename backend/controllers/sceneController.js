const Scene = require('../models/sceneModel');
const Asset = require('../models/assetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createScene = catchAsync(async (req, res) => {
  const scene = await Scene.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: { scene },
  });
});

exports.getAllScenes = catchAsync(async (req, res) => {
  const scenes = await Scene.find({ createdBy: req.user._id }).populate(
    'createdBy',
    'name email'
  );

  res.status(200).json({
    status: 'success',
    results: scenes.length,
    data: { scenes },
  });
});

exports.getSceneById = catchAsync(async (req, res, next) => {
  const scene = await Scene.findById(req.params.id).populate('createdBy', 'name email');

  if (!scene) {
    return next(new AppError('No scene found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { scene },
  });
});

exports.updateScene = catchAsync(async (req, res, next) => {
  const scene = await Scene.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('createdBy', 'name email');

  if (!scene) {
    return next(new AppError('No scene found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { scene },
  });
});

exports.deleteScene = catchAsync(async (req, res, next) => {
  const scene = await Scene.findByIdAndDelete(req.params.id);

  if (!scene) {
    return next(new AppError('No scene found with that ID', 404));
  }

  await Asset.deleteMany({ sceneId: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
