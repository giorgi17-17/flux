import { useState, useEffect } from "react";
import styles from "../styles/questions.module.css";
import { useAuth } from "../context/useAuth";
// import { Link } from "react-router-dom";
import { PayloadType, registerUser, updateUser } from "../services/fetch";
import QuestionCard from "../components/common/QuestionsCard";
import SignInOrRegister from "../components/common/SignInOrRegister";
import { useNavigate } from "react-router-dom";

type Question = {
  question: string;
  type: "text" | "number" | "radio" | "checkbox";
  options?: string[];
};
type FormDataValue = string | number | boolean | string[];

const questions: Question[] = [
  {
    question: "Choose your goal",
    type: "checkbox",
    options: ["Loose Weight", "Gain musscle", "Get Shredded"],
  },
  {
    question: "Which areas would you like to focus on?",
    type: "checkbox",
    options: ["Full Body", "Core", "Shoulders", "Legs", "Chest", "Back"],
  },
  {
    question: "What is your fitness level",
    type: "radio",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    question: "What is your name?",
    type: "text",
  },
  {
    question: "How old are you?",
    type: "number",
  },
  {
    question: "What is your gender",
    type: "radio",
    options: ["Male", "Female"],
  },
  {
    question: "Height",
    type: "number",
  },
  {
    question: "Weight",
    type: "number",
  },

  // {
  //   question: "Where do you orefer to Train",
  //   type: "radio",
  //   options: ["Home"],
  // },

  {
    question: "Are any parts of your body injured?",
    type: "checkbox",
    options: ["None","Back", "Knees", "Shoulders", "Neck", "Arms", "Legs"],
  },

  {
    question: "How much time can you commit to working out each day?",
    type: "radio",
    options: ["< 30 mins", "30-60 mins", "1-2 hours", "> 2 hours"],
  },
  {
    question: "What equipment do you have access to?",
    type: "checkbox",
    options: [
      "None",
      "Dumbbells",
      "Treadmill",
      "Cycle",
      "Barbell",
      "Jump rope",
      "Yoga mat",
    ],
  },
  {
    question: "How many days should the workout plan cover",
    type: "radio",
    options: ["1", "2", "3", "4", "5", "6", "7"],
  },
];

const Questions = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState<Record<string, FormDataValue>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const storedUserId = localStorage.getItem("myCustomId");
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers") || "false")
  );
  const localAnswers = JSON.parse(localStorage.getItem("answers") || "false");
  const navigate = useNavigate();

  const localEmail = localStorage.getItem("email") || "false";
  localStorage.setItem("email", localEmail || "false");
  console.log("localEmail", localEmail);

  let parsedEmail: boolean | string;

  if (localEmail === "false") {
    parsedEmail = JSON.parse(localEmail);
  } else {
    parsedEmail = localEmail;
  }

  useEffect(() => {
    if (!localStorage.getItem("answers")) {
      localStorage.setItem("answers", JSON.stringify(false));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: string
  ) => {
    setFormData({
      ...formData,
      [question]: e.target.value,
    });
  };

  const isInputValid = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentValue = formData[currentQuestion.question];
    return currentValue !== undefined && currentValue !== "";
  };

  const handleNext = () => {
    if (!isInputValid()) {
      alert("Please fill in the required field");
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (localEmail && localAnswers) {
    console.log("update front test ");
  } else if (localAnswers && !localEmail) {
    console.log("register front test");
  }
  console.log("out ", localAnswers);

  const handleSubmit = async () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("answers", JSON.stringify(true));
    setAnswers(true);

    const updatedLocalAnswers = JSON.parse(
      localStorage.getItem("answers") || "false"
    );

    const payload: PayloadType = {
      _id: storedUserId,
      email: localEmail,
      formData,
    };

    if (parsedEmail && updatedLocalAnswers) {
      console.log("update front");
      updateUser(payload);
    } else if (updatedLocalAnswers && !parsedEmail) {
      console.log("register front");
      registerUser(payload);
    }
  };
  const currentQuestion = questions[currentQuestionIndex];

  const handleRadioChange = (question: string, option: string) => {
    setFormData({
      ...formData,
      [question]: option,
    });
  };

  const handleDivCheckboxChange = (question: string, option: string) => {
    const currentValues = (formData[question] as string[]) || [];
    if (currentValues.includes(option)) {
      // Remove the option if it's already selected
      setFormData({
        ...formData,
        [question]: currentValues.filter((item) => item !== option),
      });
    } else {
      // Add the option if it's not selected
      setFormData({
        ...formData,
        [question]: [...currentValues, option],
      });
    }
  };

  if (currentQuestionIndex < questions.length && answers) {
    navigate("/plan");
  }

  return (
    <div className={styles.container}>
      {currentQuestionIndex < questions.length && !answers ? (
        <div className={styles.questionContainer}>
          <QuestionCard
            key={currentQuestionIndex}
            question={currentQuestion}
            handleChange={handleChange}
            handleRadioChange={handleRadioChange}
            handleDivCheckboxChange={handleDivCheckboxChange}
            formData={formData}
          />
        </div>
      ) : (
        <div className={styles.finished}>
          <div>You have completed all questions!</div>
          {!currentUser && <SignInOrRegister />}
        </div>
      )}
      {!answers && (
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleBack}
            className={styles.backButton}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={styles.nextButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
