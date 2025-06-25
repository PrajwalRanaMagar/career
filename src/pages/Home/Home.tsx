import styles from "./Home.module.css";
import Cards from "../../components/cards/cards";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.page}>
        <div>
          <div className={styles.wrapper}>
            <div className={styles.first}>
              <div className={styles.firstContainer}>We're hiring!</div>
              <h1 className={styles.firstHeading}>Be part of our mission </h1>
              <p className={styles.firstParagraph}>
                We're looking for passionate people to join us on our mission.
                We value flat hierarchies, clear communication, and full
                ownership and responsibility.
              </p>
            </div>
            <div className={styles.homeImage}></div>
          </div>
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Home;
