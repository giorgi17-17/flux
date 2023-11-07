import { useEffect, useState } from "react";
import { getAllExercises } from "../services/fetch";
import WorkoutCards from "../components/common/WorkoutCards";
import styles from "../styles/workouts.module.css";
import Categories from "../components/common/Categories";

export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
};

const Workouts = () => {
  const [data, setData] = useState<Exercise[]>([]);
  const [page, setPage] = useState(1);
  const [dataNotFound, setDataNotFound] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({
    bodyPart: "",
    target: "",
  });
  console.log(selectedOptions);
  const [dropdownOpen, setDropdownOpen] = useState({
    bodyPart: false,
    target: false,
  });
  const limit = 20;

  useEffect(() => {
    getAllExercises(
      limit,
      page,
      selectedOptions.bodyPart,
      selectedOptions.target
    )
      .then((data) => {
        setDataNotFound(false);
        setData(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setDataNotFound(true); // Set to true if a 404 is returned
        }
        console.error("An error occurred:", error);
      });
  }, [page, selectedOptions]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const toggleDropdown = (name: keyof typeof selectedOptions) => {
    setDropdownOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const selectOption = (name: keyof typeof selectedOptions, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
    setDropdownOpen((prev) => ({ ...prev, [name]: false })); // Close the dropdown
};


  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {/* Select Category Dropdown */}
        <Categories
          selectedOptions={selectedOptions}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
          selectOption={selectOption}
        />
      </div>
      {dataNotFound ? (
        <div className={styles.notFound}>
          <h2>No exercises found for this categories.</h2>
        </div>
      ) : (
        <WorkoutCards
          exercises={data}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
};

export default Workouts;
