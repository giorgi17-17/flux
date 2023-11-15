import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";

import styles from "../../styles/headerMobileComponent.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const HeaderMobileComponent = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

  useEffect(() => {
    setOpen(() => false); // close menu if path changes!
  }, [pathname]);
  const hamburgerIcon = (
    <RxHamburgerMenu
      className={styles.icon}
      size={"2rem"}
      onClick={() => setOpen(!open)}
    />
  );
  const closeIcon = (
    <VscClose
      className={styles.icon}
      size={"2.4rem"}
      onClick={() => setOpen(!open)}
    />
  );
  console.log(open);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link className={styles.link} to={"/"}>
          Flux
        </Link>
      </div>
      <div className={styles.hamburger}>{!open && hamburgerIcon}</div>
      {open && (
          <div className={styles.sideBar}>
            <div className={styles.hamburgerSideBar}>
              {open && closeIcon}
            </div>
            <div>
            <ul className={styles.navbarNav}>
              {/* <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/workouts"}>
                  Workouts
                </Link>
              </li> */}
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/meals"}>
                  Meals
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
                  Plan
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/pricing"}>
                  Pricing
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
            </div>
          </div>
      )}
    </div>
  );
};

export default HeaderMobileComponent;
