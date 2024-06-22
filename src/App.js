import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardData from "./pages/CardData";
import ListData from "./pages/ListData";
import Modal from "./pages/Modal";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Modal />
      </Router>
    </div>
  );
}

export default App;
