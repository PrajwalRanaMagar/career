import React, { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../../pages/Context/JobContext";
import styles from "./Cards.module.css";
import type { Job } from "../../types/global";
import { useContext } from "react";
interface CardProp {
  job: Job;
  children: React.ReactNode;
}

export const Card = ({ children, job }: CardProp) => {
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

export const CardHeader = ({ children }: CardProp) => {
  return <div className={styles["card-header"]}>{children}</div>;
};

export const CardBody = ({ children }: CardProp) => {
  return <div className={styles["card-body"]}>{children}</div>;
};

export const CardFooter = ({ children }: CardProp) => {
  return <div className={styles["card-footer"]}>{children}</div>;
};

const Cards = () => {
  const { jobs } = useContext(JobContext) as { jobs: Job[] };
  const navigate = useNavigate();
  {
    if (!jobs || jobs.length === 0)
      return (
        <div className={styles.errormessage}>
          We're not hiring right now. Please try again soon.
        </div>
      );
  }

  return (
    <div className={styles.cardwrapper}>
      {jobs.map((job: Job, index: number) => {
        const firstwords = job?.Description?.slice(0, 40).trim() + ".";

        return (
          <Card key={index} job={job}>
            <CardHeader>
              <h1 onClick={() => navigate("/apply", { state: { job } })}>
                {job?.JobTitle}
              </h1>
            </CardHeader>
            <CardBody>
              <p className={styles.limited}>
                {firstwords} <span>({job?.Experience})</span>
              </p>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Cards;
