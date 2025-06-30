import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const JobContext = createContext<{ jobs: Job[] }>({
  jobs: [],
});
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://sheetdb.io/api/v1/f3d38u7y7cb8d?sheet=Sheet1")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <JobContext.Provider value={{ jobs, loading }}>
      {children}
    </JobContext.Provider>
  );
};
