const { mongoose } = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    _id: ObjectId,
    user: { type: ObjectId, ref: "User" },
    flight: { type: ObjectId, ref: "Flight" },
  },
  {
    versionKey: false,
  }
);

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
    bookingModel,
};
