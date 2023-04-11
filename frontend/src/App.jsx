import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Homepage from "./pages/index";
import Dashboard from "./pages/dashboard";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken } from "./Utils/Common";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
import Search from "./pages/search";

export default function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    setAuthLoading(false);
    // axios
    //   .get(`http://localhost:4000/verifyToken?token=${token}`)
    //   .then((response) => {
    //     setUserSession(response.data.token, response.data.user);
    //     setAuthLoading(false);
    //   })
    //   .catch((error) => {
    //     removeUserSession();
    //     setAuthLoading(false);
    //   });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <BrowserRouter>
      <Nav token={getToken()} />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/logout" element={<PrivateRoute />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/profile">
          <Route path=":username" element={<Profile />} />
        </Route>
        <Route path="/search">
          <Route path=":username" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
