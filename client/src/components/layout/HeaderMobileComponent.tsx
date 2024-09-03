import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";

import styles from "../../styles/headerMobileComponent.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import SignInOrRegister from "../common/SignInOrRegister";
import { CgProfile } from "react-icons/cg";

const HeaderMobileComponent = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    setOpen(() => false); // close menu if path changes!
  }, [pathname]);
  const hamburgerIcon = (
    <RxHamburgerMenu
      className={styles.icon}
      size={"1.3rem"}
      onClick={() => setOpen(!open)}
    />
  );
  const closeIcon = (
    <VscClose
      className={styles.icon}
      size={"1.7rem"}
      onClick={() => setOpen(!open)}
    />
  );
  console.log(open);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link className={styles.link} to={"/"}>
          <h4>
            Flux
            <span className={styles.it}>it</span>
          </h4>
        </Link>
      </div>
      <div className={styles.hamburger}>{!open && hamburgerIcon}</div>
      {open && (
        <div className={styles.sideBar}>
          <div className={styles.hamburgerSideBar}>{open && closeIcon}</div>
          <div>
            <ul className={styles.navbarNav}>
              {/* <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/workouts"}>
                  Workouts
                </Link>
              </li> */}
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/meals"}>
                  კვება
                </Link>
              </li>
              {/* <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/questions"}>
                  questions
                </Link>
              </li> */}
              {/* <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/adminDashboard"}>
                  adminDashboard
                </Link>
              </li> */}
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/plan"}>
                  რუტინა
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/pricing"}>
                  ფასი
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
          {currentUser ? (
            <div className={styles.profile}>
              <div className={styles.icon}>
                <Link className={styles.iconLink} to={"profile"}>
                  <CgProfile size={"2rem"} />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <SignInOrRegister />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderMobileComponent;
