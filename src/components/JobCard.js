import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
              width: "100%",
              height: "auto",
              borderRadius: "50%",
            }}
          />
          <div className="ml-3">
            <h5 className="card-title mb-0">{job.title}</h5>
            <p className="card-text text-muted mb-0">{job.company}</p>
          </div>
        </div>
        <p className="card-text">{job.description.substring(0, 100)}...</p>
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <button
              type="button"
              className="btn btn-outline-success btn-sm btn-block"
              style={{ background: "#00ff002b" }}
            >
              {job.location}
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm btn-block"
              style={{ background: "#007bff33" }}
            >
              <span>CTC:</span>
              {Math.round(job.salary)}
            </button>
          </div>
        </div>
        <a
          href={job.applyLink}
          className="btn btn-primary btn-lg btn-block mt-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;
