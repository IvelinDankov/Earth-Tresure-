import Stones from "../models/Stones.js";

const create = (data, userId) => {
  return Stones.create({ ...data, owner: userId });
};

const getAll = (filter = {}) => {
  let query = Stones.find();

  if (filter.name) {
    query.find({ name: { $regex: filter.name, $options: 'i' } });
  }

  return query;
};

const getOne = (id) => {
  return Stones.findById(id);
};

const like = (objectId, userId) => {
  return Stones.findByIdAndUpdate(objectId, { $push: { likedList: userId } });
};

const remove = (id) => {
  return Stones.findByIdAndDelete(id);
};

const edit = (stoneId, stoneData) => {
  return Stones.findByIdAndUpdate(stoneId, stoneData, { runValidators: true });
};

export default {
  create,
  getAll,
  getOne,
  like,
  remove,
  edit,
};
