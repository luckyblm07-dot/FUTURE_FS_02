const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "Website",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    status: {
      type: String,
      default: "New",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", LeadSchema);