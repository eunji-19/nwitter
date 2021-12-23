import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Login from "routes/Login";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              exact={true}
              path="/"
              element={<Home userObj={userObj} />}
            ></Route>
            <Route exact={true} path="/profile" element={<Profile />}></Route>
          </>
        ) : (
          <Route exact={true} path="/" element={<Login />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
