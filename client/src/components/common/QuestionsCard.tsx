import styles from "../../styles/questionCard.module.css";

type QuestionCardProps = {
  question: {
    question: string;
    type: "text" | "number" | "radio" | "checkbox";
    options?: string[];
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    question: string
  ) => void;
  //   handleCheckboxChange: (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     question: string
  //   ) => void;
  formData: Record<string, string | number | boolean | string[]>;
  key: number;
  handleRadioChange: (question: string, option: string) => void;
  handleDivCheckboxChange: (question: string, option: string) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  handleChange,
  //   handleCheckboxChange,
  formData,
  //   key,
  handleRadioChange,
  handleDivCheckboxChange,
}) => {
  //   const radioGroupName = question.question.replace(/\s+/g, "_");

  return (
    <div className={styles.questionContainer}>
      <div className={styles.labelCont}>
        <label className={styles.label}>{question.question}</label>
        {question.type === "checkbox" && <p className={styles.multiple}>Multiple answers</p>}

      </div>
      {question.type !== "checkbox" && question.type !== "radio" ? (
        <input
          type={question.type}
          onChange={(e) => handleChange(e, question.question)}
          className={styles.input}
          required
        />
      ) : null}

      {question.type === "checkbox" &&
        question.options?.map((option, i) => (
          <div key={i} className={styles.checkbox}>
            <div
              className={`${styles.checkboxOption} ${
                formData[question.question] &&
                (formData[question.question] as string[]).includes(option)
                  ? styles.checkboxSelected
                  : ""
              }`}
              onClick={() => handleDivCheckboxChange(question.question, option)}
            >
              {option}
            </div>
          </div>
        ))}

      {question.type === "radio" &&
        question.options?.map((option, i) => (
          <div key={i} className={styles.radio}>
            <div
              className={`${styles.radioOption} ${
                formData[question.question] === option
                  ? styles.radioSelected
                  : ""
              }`}
              onClick={() => handleRadioChange(question.question, option)}
            >
              {option}
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestionCard;
