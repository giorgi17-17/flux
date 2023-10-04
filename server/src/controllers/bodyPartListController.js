import BodyPartList from "../models/bodyPartListModel.js";

export const addBodyPartList = async (req, res) => {
  const bodyPartList = new BodyPartList(req.body);
  try {
    await bodyPartList.save();
    res.status(201).json(bodyPartList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBodyPartLists = async (req, res) => {
  try {
    const bodyPartLists = await BodyPartList.findOne({
      _id: "651a7aed08b4663946ced3ed",
    });
    if (bodyPartLists) {
      res.status(200).json(bodyPartLists);
    } else {
      res.status(404).json({ message: "No body part lists found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
