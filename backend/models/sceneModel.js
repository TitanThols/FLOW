const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A scene must have a name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scene', sceneSchema);
