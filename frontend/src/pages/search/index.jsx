import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usersAPI from "../../api/usersApi";

export default function Search() {
  const navigate = useNavigate();
  const search = new URLSearchParams(useLocation().search).get("search");
  const [found, setFound] = useState(true);
  useEffect(() => {
    usersAPI
      .getUser({ username: search })
      .then(function (response) {
        console.log(response);
        navigate(`/profile/${search}`);
      })
      .catch(function (error) {
        setFound(false);
      });
  }, [search, navigate]);
  if (!found) {
    return (
      <div className="container">
        <div className="wrapper" style={{ textAlign: "center" }}>
          <h2>User: {search} was not found</h2>
        </div>
      </div>
    );
  }
}
