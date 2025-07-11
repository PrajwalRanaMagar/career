import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Styles from "./ApplyUI.module.css";
import type { Job } from "../../types/global";
import DocViewer from "../Docviewer/Docviewer";

const ApplyUI = () => {
  const location = useLocation();
  const job = location.state?.job as Job | undefined;
  if (!job) {
    return (
      <div className={Styles.applyui}>
        <div className={Styles.applyuicontainer}>
          <p className={Styles.errormessage}>Job details not available.</p>
        </div>
      </div>
    );
  }
  const navigate = useNavigate();
  const Breadcrumb = () => (
    <div className={Styles.breadcrumb}>
      <span onClick={() => navigate("/Home")} className={Styles.homebreadcrumb}>
        Careers
      </span>
      /
      <span onClick={() => navigate(0)} className={Styles.titlebreadcrumb}>
        {job.JobTitle}
      </span>
    </div>
  );

  return (
    <div className={Styles.applyui}>
      <Breadcrumb />
      <div className={Styles.applydoccontainer}>
        <DocViewer link={job.Link} />
      </div>
    </div>
  );
};

export default ApplyUI;
