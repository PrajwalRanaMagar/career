import styles from "./Home.module.css";
import HeroFirst from "../../components/HeroFirst/HeroFirst";
import Cards from "../../components/cards/Cards";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.page}>
        <HeroFirst />
        <h1 className={styles.pageheading}>Featured Jobs</h1>
        <Cards />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
