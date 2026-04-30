const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// GET /api/v1/users
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().select('-password');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});