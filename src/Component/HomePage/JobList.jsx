import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/job/jobSlice";
import SingleJob from "./SingleJob";

const JobList = () => {
  const { jobs, isLoading, isError, error, editing } = useSelector(
    (state) => state.jobs
  );
  const { filterBySalary, filterByType, filterBySearch } = useSelector(
    (state) => state.filters
  );
  console.log(editing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(editing).length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, editing]);

  // all filter section
  const typeByFilter = (job) => {
    switch (filterByType) {
      case "Internship":
        return job.type === "Internship";
      case "Full Time":
        return job.type === "Full Time";
      case "Remote":
        return job.type === "Remote";
      default:
        return true;
    }
  };

  const searchByFilter = (job) =>
    job.title.toLocaleLowerCase().includes(filterBySearch);

  const salaryBySort = (a, b) => {
    if (filterBySalary === "Salary (Low to High)") {
      return Number(a.salary) - Number(b.salary);
    } else if (filterBySalary === "Salary (High to Low)") {
      return Number(b.salary) - Number(a.salary);
    } else {
      return 0;
    }
  };

  // show
  let contain = null;
  if (isLoading) contain = <p>Loading...</p>;
  if (!isLoading && isError) contain = <p className="error">{error}</p>;
  if (!isLoading && !isError && jobs.length === 0) {
    contain = <p>No Job Found!</p>;
  }
  if (!isLoading && !isError && jobs.length > 0) {
    contain = jobs
      .filter(typeByFilter)
      .filter(searchByFilter)
      .sort(salaryBySort)
      .map((job) => <SingleJob job={job} key={job.id} />);
  }
  return <div className="jobs-list">{contain}</div>;
};

export default JobList;
