// src/components/Sidebar.js
import React, { useState } from "react";
import listimg from "./listicon.png";
import assignmentimg from "./assignmenticon.png";
import { Link, Route, Routes } from "react-router-dom";
import CardData from "./pages/CardData";
import ListData from "./pages/ListData";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('card');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="maindiv_content">
      <div className="row">
        <div className="col-12 com-md-12 col-lg-4">
          <div className="">
            <div className="card h-100 sidebar rounded-4 border-0 shadow-lg">
              <div className="card-body">
                <div
                  className="d-flex flex-column flex-shrink-0 p-3"
                  style={{ width: "320px", height: "100vh", maxHeight: "100%" }}
                >
                  <ul className="nav nav-pills flex-column mb-auto h-100">
                    <li className="nav-item text-dark mt-2">
                      <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <h3 className="mb-0">Hi Reader,</h3>
                        <span className="mb-0">Here's Your News</span>
                      </div>
                    </li>
                    <li className="nav-item text-dark mt-2">
                      <div className="shadow-sm p-2 mb-5 bg-white rounded">
                        <h3>View Toggle</h3>
                        <div className="viewimg">
                          <ul className="nav nav-pills">
                            <li className="nav-item">
                              <Link
                                to="/"
                                className={`nav-link ${activeTab === 'card' ? 'active' : ''}`}
                                onClick={() => handleTabClick('card')}
                              >
                                <img
                                  src={assignmentimg}
                                  alt=".."
                                  className="img-fluid me-3"
                                />
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/list"
                                className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                                onClick={() => handleTabClick('list')}
                              >
                                <img
                                  src={listimg}
                                  alt=".."
                                  className="img-fluid ms-3"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item text-dark mt-2">
                      <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <h3>Have a Feedback</h3>
                        <button
                          className="border-0 rounded-3 py-2 px-5 btnbg sidebar"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          We're Listening!
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 com-md-12 col-lg-8">
          <Routes>
            <Route path="/" element={<CardData/>} />
            <Route path="/list" element={<ListData/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
