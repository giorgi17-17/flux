import { useEffect, useState } from "react";
import SignInOrRegister from "../components/common/SignInOrRegister";
import { useAuth } from "../context/useAuth";
import styles from "../styles/userProfile.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import { getWorkoutProgress } from "../services/fetch";
import WorkoutAnalytics from "../components/common/WorkoutAnalytics";
import Bmi from "../components/common/Bmi";
import Calendar from "../components/common/Calendar";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  duration: number;
  calories: number;
}

interface WorkoutProgress {
  message: string;
  user: {
    completedWorkouts: Array<{
      date: string;
      workoutsCompleted: Exercise[];
    }>;
  };
}

const UserProfile = () => {
  const { currentUser, logOut, email } = useAuth();
  const [workoutProgress, setWorkoutProgress] =
    useState<WorkoutProgress | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          const workoutData = await getWorkoutProgress(email || "");
          setWorkoutProgress(workoutData || null);
        } catch (error) {
          console.error("An error occurred:", error);
          setWorkoutProgress(null);
        }
      }
      // setIsLoading(false);
    };

    fetchUser();
  }, [currentUser, email]);

  const completedWorkouts = workoutProgress?.user?.completedWorkouts ?? [];

  return (
    <div className={styles.container}>
      {currentUser ? (
        <div className={styles.cont}>
          <div className={styles.bmi}>
            <Calendar />
          </div>
          <div className={styles.workoutProgress}>
            <WorkoutAnalytics
              completedWorkouts={completedWorkouts || []} // Ensure it's an array
            />
            <div className={styles.bmi}>
              <Bmi />
            </div>
          </div>
          <div className={styles.user}>
            <div>
              <h2>Name</h2>
            </div>
            <div className={styles.settings}>
              <div className={styles.settingsIcon}>
                <IoSettingsOutline size={"2rem"} />
              </div>
              <button onClick={logOut} className={styles.logOut}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <SignInOrRegister />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
