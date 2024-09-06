import React, { useState, useEffect } from "react";
import styles from "../../styles/calendar.module.css";

interface WorkoutDay {
  date: string;
  status: "completed" | "upcoming" | "missed";
  caloriesBurned: number;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Generate dummy data for the current month
    const dummyData = generateDummyData(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    setWorkoutDays(dummyData);
  }, [currentDate]);

  const generateDummyData = (year: number, month: number): WorkoutDay[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const data: WorkoutDay[] = [];
    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];

      if (Math.random() > 0.5) {
        let status: WorkoutDay["status"];
        let caloriesBurned = 0;

        if (date < today) {
          status = Math.random() > 0.2 ? "completed" : "missed";
          caloriesBurned =
            status === "completed" ? Math.floor(Math.random() * 500) + 200 : 0;
        } else {
          status = "upcoming";
        }

        data.push({ date: dateString, status, caloriesBurned });
      }
    }

    return data;
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (isExpanded) {
        // Change month when expanded
        newDate.setMonth(prevDate.getMonth() + (direction === "prev" ? -1 : 1));
      } else {
        // Change week when collapsed
        newDate.setDate(prevDate.getDate() + (direction === "prev" ? -7 : 7));
      }
      return newDate;
    });
  };

  const getWeekDates = (date: Date): Date[] => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const renderDays = () => {
    const days = [];
    const daysToRender = isExpanded
      ? Array.from(
          {
            length: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0
            ).getDate(),
          },
          (_, i) =>
            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
        )
      : getWeekDates(currentDate);

    daysToRender.forEach((day) => {
      const dateString = day.toISOString().split("T")[0];
      const workoutDay = workoutDays.find((d) => d.date === dateString);
      const isToday = day.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={dateString}
          className={`${styles.day} ${isToday ? styles.today : ""} ${
            workoutDay ? styles[workoutDay.status] : ""
          }`}
        >
          <span className={styles.dayNumber}>{day.getDate()}</span>
          {workoutDay && (
            <div className={styles.workoutInfo}>
              <span className={styles.status}>{workoutDay.status}</span>
              {workoutDay.caloriesBurned > 0 && (
                <span className={styles.calories}>
                  {workoutDay.caloriesBurned} cal
                </span>
              )}
            </div>
          )}
        </div>
      );
    });

    if (isExpanded) {
      // Add empty cells for days before the start of the month
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getDay();
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.unshift(
          <div key={`empty-${i}`} className={styles.emptyDay}></div>
        );
      }
    }

    return days;
  };

  const getHeaderText = () => {
    if (isExpanded) {
      return currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } else {
      const weekStart = getWeekDates(currentDate)[0];
      const weekEnd = getWeekDates(currentDate)[6];
      return `${weekStart.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      })} - ${weekEnd.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
        // year: 'numeric'
      })}`;
    }
  };

  return (
    <div
      className={`${styles.calendarContainer} ${
        isExpanded ? styles.expanded : styles.collapsed
      }`}
    >
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={() => handleNavigation("prev")}
        >
          {isExpanded ? "Prev" : "Prev"}
        </button>
        <span className={styles.monthYear}>{getHeaderText()}</span>
        <button
          className={styles.navButton}
          onClick={() => handleNavigation("next")}
        >
          {isExpanded ? "Next" : "Next"}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.weekdays}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>
      )}
      <div className={styles.daysContainer}>{renderDays()}</div>
      <button
        className={styles.expandButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show Week" : "Show Month"}
      </button>
    </div>
  );
};

export default Calendar;
