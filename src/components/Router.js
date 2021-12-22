import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route exact={true} path="/" element={<Home />}></Route>
        ) : (
          <Route exact={true} path="/" element={<Login />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
