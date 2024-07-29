import styles from "../../styles/body.module.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import ProgramCards from "../common/ProgramCards";
// import { IoMdFitness } from "react-icons/io";
import { FaBowlFood } from "react-icons/fa6";
import { BiRun } from "react-icons/bi";
import { Link } from "react-router-dom";
import Faq from "./Faq";
// import { useAuth } from "../../context/useAuth";

const Body = () => {
  const planCreated = localStorage.getItem("planCreated");

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.main}>
          <h1 className={styles.mainText}>
            Achieve Your Fitness Goals at Home
          </h1>
          <p className={styles.text}>
            Embark on a personalized home fitness journey with expertly crafted
            workout and meal plans tailored to your goals.
          </p>
          <div className={styles.button}>
            <Link to={"/plan"} className={styles.link}>
              <button className={styles.start}>
                {planCreated === "false" || planCreated === null
                  ? "Create Your Plan"
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
        <div className={styles.programsText}>What you will get</div>
        <div className={styles.cards}>
          <ProgramCards
            icon={BiRun}
            image={image1}
            buttonText="Create Your Plan"
            text="Personalized Workout Plans"
            description="Receive customized workout plans tailored to your fitness goals. Start your fitness journey with routines that fit your lifestyle and preferences."
          />
          <ProgramCards
            image={image2}
            buttonText="Explore Diets"
            icon={FaBowlFood}
            text="Diet Plans"
            description="Access convenient meal prep services from our trusted partners. Find the right meal plan to complement your workout regime and nutritional needs."
          />
          <ProgramCards
            image={image3}
            buttonText="Join Now"
            icon={FaBowlFood}
            text="Community and Support"
            description="Join a supportive community of fitness enthusiasts. Get advice, motivation, and connect with others on the same journey."
          />
         
        </div>
      </div>
      <div className={styles.faq}>
        <Faq />
      </div>

      <div className={styles.whyUs}></div>
    </div>
  );
};

export default Body;
