import  { useState } from "react";
import styles from "../../styles/calendar.module.css";

interface WorkoutDay {
  date: string;
  completed: boolean;
  caloriesBurned: number;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Static data for demonstration
  const workoutDays: WorkoutDay[] = [
    { date: "2024-09-01", completed: true, caloriesBurned: 500 },
    { date: "2024-09-03", completed: false, caloriesBurned: 0 },
    { date: "2024-09-05", completed: true, caloriesBurned: 400 },
    // Add more static data as needed
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
    }
  };

  const renderDays = () => {
    const days = [];
    
    // Fill the first row with empty cells if the month doesn't start on Sunday
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const workoutDay = workoutDays.find((d) => d.date === dateString);

      days.push(
        <div
          key={dateString}
          className={`${styles.day} ${
            workoutDay
              ? workoutDay.completed
                ? styles.completed
                : styles.scheduled
              : ""
          }`}
        >
          <span className={styles.dayNumber}>{day}</span>
          {workoutDay && (
            <>
              <span className={styles.calories}>{workoutDay.caloriesBurned} cal</span>
            </>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={() => handleMonthChange("prev")}>Prev</button>
        <span className={styles.monthYear}>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button className={styles.navButton} onClick={() => handleMonthChange("next")}>Next</button>
      </div>
      <div className={styles.daysContainer}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
