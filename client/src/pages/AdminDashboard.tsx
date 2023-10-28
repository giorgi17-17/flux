import React, { useState, FormEvent } from "react";
import axios from "axios";
import styles from "../styles/adminDashboard.module.css";
import uniqid from "uniqid";
console.log(uniqid());

type IFormData = {
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  videoUrl: string;
  imageUrl: string;
  secondaryMuscles: string[];
  difficultyLevel: string;
  duration: string;
  caloriesBurnt: string;
  instructions: string[];
  tips: string[];
  tags: string[];
};

const AdminDashboard: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    target: "",
    bodyPart: "",
    equipment: "",
    videoUrl: "",
    imageUrl: "",
    secondaryMuscles: [],
    difficultyLevel: "",
    duration: "",
    caloriesBurnt: "",
    instructions: [],
    tips: [],
    tags: [],
  });

  const [currentInstruction, setCurrentInstruction] = useState<string>("");
  const [currentTips, setCurrentTips] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<string>("");
  const [currentSecondaryMuscle, setCurrentSecondaryMuscle] =
    useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  /////////////////////////
  const handleAddInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, currentInstruction],
    });
    setCurrentInstruction("");
  };

  const handleAddTip = () => {
    setFormData({
      ...formData,
      tips: [...formData.tips, currentTips],
    });
    setCurrentTips("");
  };

  const handleAddTags = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, currentTags],
    });
    setCurrentTags("");
  };

  const handleAddSecondaryMuscles = () => {
    setFormData({
      ...formData,
      secondaryMuscles: [...formData.secondaryMuscles, currentSecondaryMuscle],
    });
    setCurrentSecondaryMuscle("");
  };

  ///////////////////

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      // _id: uniqid(),
      ...formData,
    };
    console.log(dataToSubmit);

    try {
      const response = await axios.post("http://localhost:5000/api/workouts", dataToSubmit);
      console.log("Server response: ", response.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div  className={styles.form}>
       
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <select name="target" onChange={handleSelectChange}>
          <option value="">---</option>
          <option value="abs">Abs</option>
          <option value="chest">Chest</option>
          <option value="legs">Legs</option>
          <option value="calves">Calves</option>
          <option value="forearms">forearms</option>
          <option value="upper back">Upper Back</option>
        </select>
        <select name="bodyPart" onChange={handleSelectChange}>
          <option value="">---</option>

          <option value="waist">Waist</option>
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="upper legs">Upper Legs</option>
          <option value="lower legs">Lower Legs</option>
          <option value="upper arms">Upper Arms</option>
          <option value="lower arms">Lower Arms</option>
          <option value="shoulders">Shoulders</option>
        </select>
        <select name="equipment" onChange={handleSelectChange}>
          <option value="">---</option>

          <option value="bodyWeight">Body weight</option>
          <option value="dumbbell">Dumbbell</option>
          <option value="none">None</option>
        </select>
        <select name="difficultyLevel" onChange={handleSelectChange}>
          <option value="">---</option>

          <option value="beginer">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          onChange={handleChange}
          value={formData.videoUrl}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
        />
   

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          onChange={handleChange}
        />
        <input
          type="text"
          name="caloriesBurnt"
          placeholder="Calories Burnt"
          onChange={handleChange}
        />
     
        <div className={styles.instructions}>
          <label htmlFor="">Instructions</label>
          <input
            onChange={(e) => {
              setCurrentInstruction(e.target.value);
            }}
            type="text"
            name="instructions"
            value={currentInstruction}
          />
          <button onClick={handleAddInstruction}>ADD</button>
        </div>

        <div className={styles.tips}>
          <label htmlFor="">Tips</label>

          <input
            onChange={(e) => {
              setCurrentTips(e.target.value);
            }}
            type="text"
            name="tips"
            value={currentTips}
          />
          <button onClick={handleAddTip}>ADD</button>
        </div>
        <div className={styles.tags}>
          <label htmlFor="">Tags</label>

          <input
            onChange={(e) => {
              setCurrentTags(e.target.value);
            }}
            type="text"
            name="tags"
            value={currentTags}
          />
          <button onClick={handleAddTags}>ADD</button>
        </div>
        <div className={styles.tags}>
          <label htmlFor="">Secondary Muscles</label>

          <input
            onChange={(e) => {
              setCurrentSecondaryMuscle(e.target.value);
            }}
            type="text"
            name="tags"
            value={currentSecondaryMuscle}
          />
          <button onClick={handleAddSecondaryMuscles}>ADD</button>
        </div>
       

        <button type="submit" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
