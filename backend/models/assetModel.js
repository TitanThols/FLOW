const mongoose = require('mongoose');

const PIPELINE_STAGES = ['Concept', 'Modeling', 'Texturing', 'Rendering', 'Final Output'];

const assetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'An asset must have a title'],
      trim: true,
    },
    status: {
      type: String,
      enum: PIPELINE_STAGES,
      default: 'Concept',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
    },
    sceneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scene',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);
