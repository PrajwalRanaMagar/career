import React from "react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../../pages/Context/JobContext";
import styles from "./Cards.module.css";
import { useContext } from "react";

export const Card = ({ children, job }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate("/apply", { state: { job } })}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className={styles["card-header"]}>{children}</div>;
};

export const CardBody = ({ children }) => {
  return <div className={styles["card-body"]}>{children}</div>;
};

export const CardFooter = ({ children }) => {
  return <div className={styles["card-footer"]}>{children}</div>;
};

const Cardd = () => {
  const { jobs } = useContext(JobContext);
  const navigate = useNavigate();

  return (
    <div className={styles.cardwrapper}>
      {jobs.map((job, index) => {
const first24Words = job.Description.split(".")[0].trim()+".";

        return (
          <Card key={index} job={job}>
            <CardHeader>
              <h1 onClick={() => navigate("/apply", { state: { job } })}>
                {job.JobTitle}
              </h1>
             
            </CardHeader>
            <CardBody>
                            <p className={styles.limited}>{first24Words}   <span>({job.Experience})</span></p>

            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Cardd;
