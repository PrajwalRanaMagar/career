import React, { useContext, useState } from "react";
import styles from "./Home.module.css";
import HeroFirst from "../../components/HeroFirst/HeroFirst";
import Cards from "../../components/cards/Cards";
import { JobContext } from "../Context/JobContext";
import type { Job } from "../../types/global";
``;
const Home = () => {
  const { jobs } = useContext(JobContext) as { jobs: Job[] };
  const [filter, setFilter] = useState<string>("");

  const normalize = (str: string) =>
    (str || "").toLowerCase().replace(/\s/g, "");

  const typeCounts: Record<string, number> = {};
  jobs.forEach((job) => {
    const type = normalize(job.EmploymentType || "");
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });

  const validTypes = Object.keys(typeCounts).filter(
    (type) => type && typeCounts[type] > 2
  );

  const filteredJobs = filter
    ? jobs.filter((job) => normalize(job.EmploymentType || "") === filter)
    : jobs;

  return (
    <div className={styles.homepage}>
      <div className={styles.page}>
        <HeroFirst
          filter={filter}
          setFilter={setFilter}
          validTypes={validTypes}
        />

        <h1 className={styles.pageheading}>Featured Jobs</h1>

        <Cards jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default Home;
