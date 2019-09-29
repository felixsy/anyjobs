const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  company: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  lga: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  admin: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  signup_on: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("companies", companySchema);
