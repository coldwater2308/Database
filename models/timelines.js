const mongoose = require("mongoose");
let Schema = mongoose.Schema;
var timelinesSchema = new mongoose.Schema(
  {
    projectId: { type: Schema.ObjectId, ref: "Projects" },
    name: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Timelines", timelinesSchema);
