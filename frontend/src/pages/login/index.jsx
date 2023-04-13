import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../../Utils/Common";
import usersAPI from "../../api/usersApi";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    usersAPI
      .loginUser({
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        setUserSession(true, response.data);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch(function (error) {
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <form
        className="reglog"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <h1>Welcome</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          value={data.password}
          onChange={handleChange}
        />
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
