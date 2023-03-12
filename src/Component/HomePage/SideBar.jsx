import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterByType } from "../../features/filter/filterSlice";

const SideBar = () => {
  // const [type, setType] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              onClick={(e) => dispatch(filterByType("All"))}
              className="main-menu menu-active"
              id="lws-alljobs-menu"
            >
              <i className="fa-solid fa-briefcase"></i>
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <Link
                  to="/"
                  className="sub-menu"
                  href="/jobs/internship"
                  id="lws-internship-menu"
                  onClick={(e) => dispatch(filterByType("Internship"))}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>{" "}
                  Internship
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="sub-menu"
                  href="/jobs/fulltime"
                  id="lws-fulltime-menu"
                  onClick={(e) => dispatch(filterByType("Full Time"))}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i> Full Time
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="sub-menu"
                  href="/jobs/remote"
                  id="lws-remote-menu"
                  onClick={(e) => dispatch(filterByType("Remote"))}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i> Remote
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/jobs" className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus"></i>{" "}
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
