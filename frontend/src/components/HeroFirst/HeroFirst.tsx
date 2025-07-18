import React from "react";
import Styles from "./HeroFirst.module.css";
import { IoIosSearch } from "react-icons/io";

interface HeroFirstProps {
  filter: string;
  setFilter: (filter: string) => void;
  validTypes: string[];
  loading: boolean;
}

const HeroFirst = ({
  filter,
  setFilter,
  validTypes,
  loading,
}: HeroFirstProps) => {
  return (
    <div className={Styles.HeroFirst}>
      <div className={Styles.HeroFirstwwrappper}>
        <h1>Start Your Journey with Zakipoint</h1>
        {!loading && (
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
        )}
      </div>
    </div>
  );
};

export default HeroFirst;
