import React from "react";
import Styles from "./HeroFirst.module.css";
import { IoIosSearch } from "react-icons/io";

const HeroFirst = () => {
  return (
    <div className={Styles.HeroFirst}>
      <div className={Styles.HeroFirstwwrappper}>
        <h1>Your career starts here</h1>
        <div className={Styles.heroinputfield}>
<IoIosSearch />

          <input type="name" />
        </div>
        <div className={Styles.herofirstbuttons}>
          <button className={Styles.button}>
            Remote
          </button>
          <button className={Styles.button}>
            Entry Level
          </button>
          <button className={Styles.button}>
            Full Time
          </button>
          <button className={Styles.button}>
            Part Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroFirst;
