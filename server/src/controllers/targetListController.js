import TargetList from "../models/targetListMode.js";

export const getAllTargetList = async (req, res) => {
    try {
      const targetList = await TargetList.findOne({
        _id: "651a833008b4663946ede5e1",
      });
      if (targetList) {
        res.status(200).json(targetList);
      } else {
        res.status(404).json({ message: "No body part lists found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };