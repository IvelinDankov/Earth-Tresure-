import { Schema, Types, model } from "mongoose";

const stoneSchema = new Schema({
  name: {
    type: String,
    required: [true, ""],
  },
  category: {
    type: String,
    required: [true, ""],
  },
  color: {
    type: String,
    required: [true, ""],
  },
  image: {
    type: String,
    required: [true, ""],
  },
  location: {
    type: String,
    required: [true, ""],
  },
  formula: {
    type: String,
    required: [true, ""],
  },
  description: {
    type: String,
    required: [true, ""],
  },

  likedList: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Stones = model("Stones", stoneSchema);

export default Stones;
