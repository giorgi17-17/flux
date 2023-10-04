import mongoose from "mongoose";

const bodyPartListSchema = new mongoose.Schema(
  {
    bodyPartList: [String],
  },
  { collection: "bodyPartList" }
);

const BodyPartList = mongoose.model("BodyPartList", bodyPartListSchema,"bodyPartList");

export default BodyPartList;
