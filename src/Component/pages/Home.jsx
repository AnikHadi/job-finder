import React from "react";

import JobList from "../HomePage/JobList";
import JobListHeader from "../HomePage/JobListHeader";

const Home = () => {
  return (
    <>
      <JobListHeader />
      <JobList />
    </>
  );
};

export default Home;
