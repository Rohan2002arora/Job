import React, { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetchJobs = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=b7e1aabe&app_key=02de3409a91f33c5615620cf7f422590&results_per_page=20&what=${searchQuery}&where=San+Francisco`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const formattedJobs = data.results.map((job) => ({
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        description: job.description,
        salary: Math.round(job.salary_max), // Rounding off salary
        applyLink: job.redirect_url,
      }));
      setJobs(formattedJobs);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchJobs(query);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar navbar-light bg-body-tertiary navbar-custom">
          <div className="container-fluid">
            <a className="navbar-brand">JobFin</a>
            <form className="d-flex input-group w-auto" onSubmit={handleSearch}>
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="input-group-text border-0"
                id="search-addon"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </nav>
      </div>
      <div className="container">
        <h1 className="text-center mt-5 mb-4">Job Listings</h1>
        <div className="row">
          {jobs.map((job, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
