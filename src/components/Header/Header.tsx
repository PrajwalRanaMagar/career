import Style from "./Header.module.css";
import Zakilogo from "../../assets/zph-blue.png";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Home from "./../../pages/Home/Home";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={Style.Header}>
      <div className={Style.headerwrapper}>
        <div className={Style.headerfirst}>
          <div
            className={Style.headerfirstimagediv}
            onClick={() => {
              window.location.href = "https://www.zakipointhealth.com/";
            }}
          >
            <img src={Zakilogo} className={Style.Zakilogo} alt="Zakilogo" />
          </div>
        </div>
        <div className={Style.headerfirstseconddiv}>
          <ul>
            <li
              onClick={() => {
                window.location.href = "https://www.zakipointhealth.com/";
              }}
            >
              Home
            </li>

            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Careers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
