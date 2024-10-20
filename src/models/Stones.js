import { Schema, Types, model } from "mongoose";

const stoneSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [2, "Should be at least 2 char!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
    minLength: [3, "Should be at least 3 char!"],
  },
  color: {
    type: String,
    required: [true, "Color is required!"],
    minLength: [2, "Should be at least 2 char!"],
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
    validator: [/^https?:\/\//, "Should start with http:// or https://"]
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
    minLength: [5, "Should be at least 5 char!"],
    maxLength: [15, "Should be max 15 chars!"],
  },
  formula: {
    type: String,
    required: [true, "Formula is required!"],
    minLength: [3, "Should be at least 3 char!"],
    maxLength: [30, "Should be max 30 chars!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [10, "Should be at least 10 char!"],
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
