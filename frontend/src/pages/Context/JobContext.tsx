import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import type { Job } from "../../types/global"; // Adjust the import path as needed

interface JobContextType {
  jobs: Job[];
  loading: boolean;
}

export const JobContext = createContext<JobContextType>({
  jobs: [],
  loading: true,
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        "https://api.sheetbest.com/sheets/4501b46e-25e6-4878-a90d-e4270f9a738f"
      )
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
