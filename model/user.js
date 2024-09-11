import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Address = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  }
});
const user = new Schema({
  userFullName: {
    type: String,
    required: true,
  },
  userGender:{
    type: String
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userAddress: {
    type: [Address],
  },
  userMobile: {
    type: Number,
  },
  userCreatedAt: {
    type: Date,
  },
  userUpdatedAt: {
    type: Date,
  },
  verified:{
    type:Boolean
  }
});

export default mongoose.model("User", user);
