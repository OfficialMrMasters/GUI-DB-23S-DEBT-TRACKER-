import React, { useEffect, useState } from "react";
import { getUser } from "../Utils/Common";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSearch = () => {
    navigate(`/search/${search.value}`);
  };

  const search = useInput("");

  return (
    <>
      {user ? (
        <nav>
          <NavLink to="/">
            <h1>DEBT TRACKER</h1>
          </NavLink>
          <span>
            <form onSubmit="event.preventDefault();">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="search"
                {...search}
              />
              <button type="submit" onClick={handleSearch}>
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
