import React from "react";
import Styles from "./HeroFirst.module.css";
import { IoIosSearch } from "react-icons/io";

interface HeroFirstProps {
  filter: string;
  setFilter: (filter: string) => void;
  validTypes: string[];
}

const HeroFirst = ({ filter, setFilter, validTypes }: HeroFirstProps) => {
  return (
    <div className={Styles.HeroFirst}>
      <div className={Styles.HeroFirstwwrappper}>
        <h1 className={Styles.butoo}>Your career starts here</h1>
        <div className={Styles.heroinputfield}>
          <IoIosSearch className={Styles.searchbutton} />
          <input
            className={Styles.input}
            type="text"
            placeholder="Search By title, skill, or company"
          />
        </div>

        <div className={Styles.herofirstbuttons}>
          <button
            className={`${Styles.buttonHero} ${
              filter === "" ? Styles.active : ""
            }`}
            onClick={() => setFilter("")}
          >
            All
          </button>

          {validTypes.map((type) => (
            <button
              key={type}
              className={`${Styles.buttonHero} ${
                filter === type ? Styles.active : ""
              }`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFirst;
