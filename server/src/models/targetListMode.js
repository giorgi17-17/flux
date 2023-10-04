import mongoose from "mongoose";

const targetListSchema = new mongoose.Schema(
  {
    targetList: [String],
  },
  { collection: "targetList" }
);

const TargetList = mongoose.model("TargetList", targetListSchema,"targetList");

export default TargetList;
