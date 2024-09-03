import { useState, useEffect } from "react";
import styles from "../../styles/bmi.module.css";
import { useAuth } from "../../context/useAuth"; 
import { getUserByEmail } from "../../services/fetch";

const Bmi = () => {
  const { email } = useAuth();
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        try {
          const userProfile = await getUserByEmail(email);    
          setHeight(userProfile.formData["Height"] || null);
          setWeight(userProfile.formData["Weight"] || null);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchUserData();
  }, [email]);

  useEffect(() => {
    if (height && weight) {
      const calculatedBmi = (weight / ((height / 100) ** 2)).toFixed(1);
      setBmi(parseFloat(calculatedBmi));
      determineBmiCategory(parseFloat(calculatedBmi));
    }
  }, [height, weight]);

  const determineBmiCategory = (bmi: number) => {
    if (bmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setBmiCategory("Normal weight");
    } else if (bmi >= 25 && bmi < 29.9) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obese");
    }
  };

  return (
    <div className={styles.bmiContainer}>
      <h3 className={styles.bmiTitle}>Your BMI</h3>
      {bmi && (
        <div className={styles.bmiResult}>
          <p>BMI: <span className={styles.bmiValue}>{bmi}</span></p>
          <p>Category: <span className={styles.bmiValue}>{bmiCategory}</span></p>
        </div>
      )}
    </div>
  );
};

export default Bmi;
