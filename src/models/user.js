const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email cannot be Empty'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name cannot be Empty'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bookedShows: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Show',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
