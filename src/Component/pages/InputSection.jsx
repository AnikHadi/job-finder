import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createJob,
  editInactive,
  editJob,
  fetchJobs,
} from "../../features/job/jobSlice";

const InputSection = () => {
  const [title, setTitle] = useState("Select Job");
  const [type, setType] = useState("Select Job Type");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { editing, isLoading, isError } = useSelector((state) => state.jobs);
  const navigate = useNavigate();

  // fetch data
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // listen for edit mode active
  useEffect(() => {
    const { id, title, salary, type, deadline } = editing || {};
    if (id) {
      setEditMode(true);
      setTitle(title);
      setSalary(salary);
      setType(type);
      setDeadline(deadline);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const reset = () => {
    setTitle("");
    setSalary("");
    setType("");
    setDeadline("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createJob({
        title,
        type,
        salary: Number(salary),
        deadline,
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editJob({
        id: editing.id,
        data: {
          title,
          type,
          salary: Number(salary),
          deadline,
        },
      })
    );
    reset();
    dispatch(editInactive());
    setEditMode(false);
    navigate("/");
  };

  return (
    <div>
      <h1 className="mb-10 text-center lws-section-title">
        {editMode ? "Edit Job" : "Add New Job"}
      </h1>

      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={editMode ? handleUpdate : handleSubmit}
          className="space-y-6"
        >
          <div className="fieldContainer">
            <label
              htmlFor="lws-JobTitle"
              className="text-sm font-medium text-slate-300"
            >
              Job Title
            </label>
            <select
              id="lws-JobTitle"
              name="lwsJobTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            >
              <option value="" hidden>
                Select Job
              </option>
              <option>Software Engineer</option>
              <option>Software Developer</option>
              <option>Full Stack Developer</option>
              <option>MERN Stack Developer</option>
              <option>DevOps Engineer</option>
              <option>QA Engineer</option>
              <option>Product Manager</option>
              <option>Social Media Manager</option>
              <option>Senior Executive</option>
              <option>Junior Executive</option>
              <option>Android App Developer</option>
              <option>IOS App Developer</option>
              <option>Frontend Developer</option>
              <option>Frontend Engineer</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobType">Job Type</label>
            <select
              id="lws-JobType"
              name="lwsJobType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" hidden>
                Select Job Type
              </option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobSalary">Salary</label>
            <div className="flex border rounded-md shadow-sm border-slate-600">
              <span className="input-tag">BDT</span>
              <input
                type="number"
                name="lwsJobSalary"
                id="lws-JobSalary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                className="!rounded-l-none !border-0"
                placeholder="20,00,000"
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobDeadline">Deadline</label>
            <input
              type="date"
              name="lwsJobDeadline"
              id="lws-JobDeadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <button
              disabled={isLoading}
              type="submit"
              id="lws-submit"
              className="cursor-pointer btn btn-primary w-fit"
            >
              {editMode ? "Edit Job" : "Add Job"}
            </button>
          </div>
          {!isLoading && isError && (
            <p className="error">There was an error occured</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default InputSection;
