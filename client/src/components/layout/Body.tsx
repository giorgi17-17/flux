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
            ივარჯიშე დამოუკიდებლად
          </h1>
          <p className={styles.text}>
            თუ დამწყები ხარ და არ იცი როგორ ივარჯიშო სწორად, მაშინ სწორ ადგილას ხარ. შექმენი შენზე მორგებული ვარჯიშის რუტინა.
          </p>
          <div className={styles.button}>
            <Link to={"/plan"} className={styles.link}>
              <button className={styles.start}>
                {planCreated === "false" || planCreated === null
                  ? "შექმენი რუტინა"
                  : "რუტინის ნახვა"}
              </button>
            </Link>
          </div>
        </div>
        {/* <div className={styles.image}>
          <img src={image} alt="fsd" />
        </div> */}
      </div>
      <div className={styles.programs}>
        <div className={styles.programsText}>რას მიიღებ</div>
        <div className={styles.cards}>
          <ProgramCards
            icon={BiRun}
            image={image1}
            buttonText="შექმენი რუტინა"
            text="პერსონალიზირებული ვარჯიშები"
            description="მიიღე შენზე მორგებული ვარჯიშის რუტინა და მიაღწიე შენს მიზნებს დამოუკიებლად"
          />
          {/* დღეიდან შეგიძლია შეუკვეთო მთელი კვირის მზა საჭმელი რომელსაც ყოველ დილით მოგიტანთ. აღარ მოგიწევს იმაზე ფიქრი თუ როგორ იკვებო სწორად.  */}
          <ProgramCards
            image={image2}
            buttonText="აღმოაჩინე დიეტები"
            icon={FaBowlFood}
            text="სწორი კვება"
            description="დღეიდან შეგიძლია შეუკვეთო მთელი კვირის მზა საჭმელი რომელსაც ყოველ დილით მოგიტანთ. აღარ მოგიწევს იმაზე ფიქრი თუ როგორ იკვებო სწორად."
          />
          <ProgramCards
            image={image3}
            buttonText="შემოგვიერთდი"
            icon={FaBowlFood}
            text="ჯგუფი"
            description="შემოგვიერთდი ჯგუფში სადაც შეძლებ გაიცნო ახალი ადამიანები და ერთად გადალახოთ დარბაზში მარტო სიარულის შიში."
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
