import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../../pages/Context/JobContext";
import styles from "./Cards.module.css";
import type { Job } from "../../types/global";
import { useContext } from "react";
import NumberList from "../NumberList/NumberList";
import { Calendar1 } from "lucide-react";
interface CardProp {
  job: Job;
  children: React.ReactNode;
}
interface ChildrenProp {
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

export const CardHeader = ({ children }: ChildrenProp) => {
  return <div className={styles["card-header"]}>{children}</div>;
};

export const CardBody = ({ children }: ChildrenProp) => {
  return <div className={styles["card-body"]}>{children}</div>;
};

export const CardFooter = ({ children }: ChildrenProp) => {
  return <div className={styles["card-footer"]}>{children}</div>;
};

const Cards = () => {
  const { jobs, loading } = useContext(JobContext) as {
    jobs: Job[];
    loading: boolean;
  };
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 12;

  if (loading) {
    return (
      <div className={styles.loadingmessage}>
        Please wait while we load current openings.
      </div>
    );
  }

  const today = new Date();
  const validjobs = jobs.filter((job) => {
    const isActive = job?.Status?.toLowerCase() === "active";
    if (!job.ApplicationDeadline) return isActive;
    const deadline = new Date(job.ApplicationDeadline);
    const isDeadlinevalid = deadline >= today;
    return isActive || isDeadlinevalid;
  });

  {
    if (!validjobs || validjobs.length === 0)
      return (
        <div className={styles.errormessage}>
          We're not hiring right now. Please try again soon.
        </div>
      );
  }

  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentJobs = validjobs.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className={styles.cardwrapper}>
        {currentJobs.map((job: Job, index: number) => {
          return (
            <Card key={index} job={job}>
              <CardHeader>
                <h1 onClick={() => navigate("/apply", { state: { job } })}>
                  {job?.JobTitle}
                </h1>
              </CardHeader>
              <CardBody>
                <p>{job.JobType}</p>
              </CardBody>
              <CardFooter>
                <div className={styles.deadlineapplication}>
                  <Calendar1 />
                  <p>{job?.ApplicationDeadline}</p>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className={styles.paginationWrapper}>
        <NumberList
          totalPosts={validjobs.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Cards;
