import React, { useEffect, useState } from "react";
import { getUser } from "../Utils/Common";
import { NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, [location]);

  return (
    <>
      {user ? (
        <nav>
          <NavLink to="/dashboard">
            <h1>I OWE YOU</h1>
          </NavLink>
          <span>
            <form className="search" action="/search" method="get">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="search"
              />
              <button type="submit">
                <img
                  src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"
                  alt="button"
                />
              </button>
            </form>
            <NavLink to={`/profile/${user.username}`}>Profile</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </span>
        </nav>
      ) : (
        <nav>
          <NavLink to="/">
            <h1>I OWE YOU</h1>
          </NavLink>
          <span>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </span>
        </nav>
      )}
    </>
  );
}
