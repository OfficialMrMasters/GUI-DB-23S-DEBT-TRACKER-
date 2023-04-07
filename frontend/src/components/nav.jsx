import React, { useEffect, useState } from "react";
import { getToken, getUser } from "../Utils/Common";
import { NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, [location]);

  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    return {
      value,
      onChange: handleChange,
    };
  };

  return (
    <>
      {user ? (
        <nav>
          <NavLink to="/">
            <h1>DEBT TRACKER</h1>
          </NavLink>
          <span>
            <input type="text" id="search" name="search" placeholder="search" />
            <NavLink to={`/profile/${user.username}`}>Profile</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </span>
        </nav>
      ) : (
        <nav>
          <h1>DEBT TRACKER</h1>
          <span>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </span>
        </nav>
      )}
    </>
  );
}
