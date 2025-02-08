const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
