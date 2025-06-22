import React from "react";
import Styles from "./Home.module.css";
import Cards from "../../components/cards/cards";
import JobCards, { JobCard } from "../../components/cards/JobCards";

const Home = () => {
  return (
    <div>
      <div className={Styles["home-page"]}>
        <div className={Styles["home-wrapper"]}>
          <div className={Styles["home-first"]}>
            <div className={Styles["home-first-div"]}>
              <div className={Styles["home-first-container"]}>
                We're hiring!
              </div>
              <h1 className={Styles["home-first-heading"]}>
                Be part of our mission
              </h1>
              <p className={Styles["home-first-paragraph"]}>
                We're looking for passionate people to join us on our mission.
                We value flat hierarchies, clear communication, and full
                ownership and responsibility.
              </p>
            </div>
            <div className={Styles["home-image"]}></div>
          </div>

          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Home;
