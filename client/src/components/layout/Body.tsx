import styles from "../../styles/body.module.css";
import Footer from "./Footer";
// import image from "../../assets/cagin-kargi-Qzp60FT380E-unsplash.jpg";
import ProgramCards from "../common/ProgramCards";
import { IoMdFitness } from "react-icons/io";
import { FaBowlFood } from "react-icons/fa6";
import { BiRun } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";

const Body = () => {
  // const { currentUser } = useAuth();

  // console.log(currentUser)

  const planCreated = localStorage.getItem("planCreated");
  // const parsed = JSON.parse(planCreated)
  // console.log(typeof parsed);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.main}>
          <h1 className={styles.mainText}>
            Achieve Your Fitness Goals at Home
          </h1>
          <p className={styles.text}>
            Your home workout companion with personalized plans and expert
            guidance. This platform will help you manage how you will workout
            for a week and provide you with meal plans.
          </p>
          <div className={styles.button}>
            <Link to={"/plan"} className={styles.link}>
              <button className={styles.start}>
                {planCreated === "false" ? "Create Plan" : "See your plan"}
              </button>
            </Link>
          </div>
        </div>
        {/* <div className={styles.image}>
          <img src={image} alt="fsd" />
        </div> */}
      </div>
      <div className={styles.programs}>
        <div className={styles.programsText}>Our Training Programs</div>
        <div className={styles.cards}>
          <ProgramCards
            icon={BiRun}
            text="Fat Loss Workout"
            description=" Achieve your fitness goals with our effective fat loss workout programs. Get in shape, burn calories, and lose weight."
          />
          <ProgramCards
            icon={FaBowlFood}
            text="Diet Plans"
            description="Discover healthy eating habits and balanced diet plans to support your fitness journey."
          />
          <ProgramCards
            icon={IoMdFitness}
            text="Muscle Building"
            description="Build and sculpt your muscles with our muscle-building workouts. Whether you're a beginner or an experienced athlete."
          />
        </div>
      </div>
      <div className={styles.whyUs}></div>
      <Footer />
    </div>
  );
};

export default Body;
