import React from "react";
import Style from "./NumberList.module.css";
const NumberList = () => {
  return (
    <div className={Style.footer}>
      <p className={Style.leftarrow}>{"<"}</p>
      <ul className={Style.numberlist}>
        <li>
          <button className={Style.pageButton}>1</button>
        </li>
        <li>
          <button className={Style.pageButton}>2</button>
        </li>
        <li>
          <button className={Style.pageButton}>3</button>
        </li>
        <li>
          <button className={Style.pageButton}>4</button>
        </li>
        <li>
          <button className={Style.pageButton}>5</button>
        </li>
        <li>
          <button className={Style.pageButton}>6</button>
        </li>
      </ul>

      <p className={Style.leftarrow}>{">"}</p>
    </div>
  );
};

export default NumberList;
