import styles from "../../styles/body.module.css";
import Footer from "./Footer";
// import image from "../../assets/cagin-kargi-Qzp60FT380E-unsplash.jpg";
import ProgramCards from "../common/ProgramCards";
// import { IoMdFitness } from "react-icons/io";
import { FaBowlFood } from "react-icons/fa6";
import { BiRun } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";

const Body = () => {

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
            Embark on a personalized home fitness journey with expertly crafted
            workout and meal plans tailored to your goals. Start transforming
            today.
          </p>
          <div className={styles.button}>
            <Link to={"/plan"} className={styles.link}>
              <button className={styles.start}>
                {planCreated === "false"
                  ? "Get Started with Your Plan"
                  : "View Your Plan"}
              </button>
            </Link>
          </div>
        </div>
        {/* <div className={styles.image}>
          <img src={image} alt="fsd" />
        </div> */}
      </div>
      <div className={styles.programs}>
        <div className={styles.programsText}>
          What you will {""}
          <span className={styles.achieve}>GET</span>
        </div>
        <div className={styles.cards}>
          <ProgramCards
            icon={BiRun}
            text="Workout plan based on you"
            description=" Achieve your fitness goals with our effective fat loss workout programs. Get in shape, burn calories, and lose weight."
          />
          <ProgramCards
            icon={FaBowlFood}
            text="Diet Plans"
            description="Discover healthy eating habits and balanced diet plans to support your fitness journey."
          />
          {/* <ProgramCards
            icon={IoMdFitness}
            text="Muscle Building"
            description="Build and sculpt your muscles with our muscle-building workouts. Whether you're a beginner or an experienced athlete."
          /> */}
          {/* <ProgramCards
            icon={IoMdFitness}
            text="You can use it for free while it is on BETA version"
            description="Try our program and see if you can achieve your goals by our help"
          /> */}
        </div>
      </div>
      <div className={styles.whyUs}></div>
      <Footer />
    </div>
  );
};

export default Body;
