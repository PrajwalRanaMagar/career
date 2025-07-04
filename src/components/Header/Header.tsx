import React from "react";
import Style from "./Header.module.css";
import Zakilogo from "../../assets/zph-blue.png";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={Style.Header}>
      <div className={Style.headerwrapper}>
        <div className={Style.headerfirst}>
          <div className={Style.headerfirstimagediv}>
            <img src={Zakilogo} className={Style.Zakilogo} alt="Zakilogo" />
          </div>
          <div className={Style.headerfirstseconddiv}>
            <ul>
              <li
                onClick={() => {
                  navigate(0);
                }}
              >
                Home
              </li>
              <li>About</li>
              <li
                onClick={() => {
                  navigate(0);
                }}
              >
                Careers
              </li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className={Style.headersecond}>
          <div className={Style.headersecondsearchdiv}>
            <IoIosSearch className={Style.searchimage} />
            <input
              type="name"
              placeholder="Search"
              className={Style.inputfield}
            />
          </div>
          <div className={Style.headersecondapplybutton}>
            <button>Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
