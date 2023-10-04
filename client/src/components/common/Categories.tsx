import React from "react";
import styles from "../../styles/categories.module.css";

type CategoriesProps = {
  selectedOptions: {
    bodyPart: string;
    target: string;
  };
  dropdownOpen: {
    bodyPart: boolean;
    target: boolean;
  };
  toggleDropdown: (name: "bodyPart" | "target") => void;
  selectOption: (name: "bodyPart" | "target", value: string) => void;
};
const Categories: React.FC<CategoriesProps> = ({
    selectedOptions,
    dropdownOpen,
    toggleDropdown,
    selectOption,
  }) => {
    const bodyPartOptions = ["All", "waist", "back", "cardio", "chest"]; // Replace with actual values
    const targetOptions = ["abs", "biceps"]; // Replace with actual values
  
    return (
      <div className={styles.categories}>
        {/* Select Category Dropdown */}
        <div className={styles.customDropdown} onClick={() => toggleDropdown("bodyPart")}>
          <div className={styles.Select}>
            {selectedOptions.bodyPart || "Select Category"}
          </div>
          <div className={`${styles.dropdownContent} ${dropdownOpen.bodyPart ? styles.show : ""}`}>
            {bodyPartOptions.map((option, index) => (
              <span 
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption("bodyPart", option);
                }}
              >
                {option}
              </span>
            ))}
          </div>
        </div>
        {/* Select Target Dropdown */}
        <div className={styles.customDropdown} onClick={() => toggleDropdown("target")}>
          <div className={styles.Select}>
            {selectedOptions.target || "Select Target"}
          </div>
          <div className={`${styles.dropdownContent} ${dropdownOpen.target ? styles.show : ""}`}>
            {targetOptions.map((option, index) => (
              <span 
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption("target", option);
                }}
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default Categories;

  