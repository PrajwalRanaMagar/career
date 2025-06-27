import styles from "./Home.module.css";
import Cards from "../../components/cards/cards";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.page}>
        <h1>Featured Jobs</h1>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
