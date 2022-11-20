const mongoose = require("mongoose");
let Schema = mongoose.Schema;
var itemsSchema = new mongoose.Schema(
  {
    timelineId: { type: Schema.ObjectId, ref: "Timelines" },
    name: { type: String },
    startDate: [{ type: Date }],
    endDate: [{ type: Date }],
    status: { type: Number }, //1-Yet to Start 2-Active 3-Pending 4-Delayed 5-Completed
    remarks: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Items", itemsSchema);
