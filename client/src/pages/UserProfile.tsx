import { useEffect, useState } from "react";
import SignInOrRegister from "../components/common/SignInOrRegister";
import { useAuth } from "../context/useAuth";
import styles from "../styles/userProfile.module.css"; // Make sure you import the correct CSS file
import { IoSettingsOutline } from "react-icons/io5";
import { getWorkoutProgress } from "../services/fetch";
const UserProfile = () => {
  const { currentUser, logOut } = useAuth();
  //   get workout names from workout component
  // const [user, setUser] = useState<User | null>(null);
  const email = localStorage.getItem("email") || "";
  const [workoutProgress, setWorkoutProgress] = useState();

  const [isLoading, setIsLoading] = useState(true);
  console.log(workoutProgress);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        console.log(currentUser);
        try {
          const workoutData = await getWorkoutProgress(email);
          setWorkoutProgress(workoutData);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [currentUser, isLoading, email]);
  console.log(workoutProgress);

  return (
    <div className={styles.container}>
      {currentUser ? (
        <div className={styles.cont}>
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
          <div className={styles.workoutProgress}>
            <div>Calendar</div>
            <div>weight</div>
            <div className={styles.weekProgress}>
              <h2>Calories burned 1200</h2>
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
