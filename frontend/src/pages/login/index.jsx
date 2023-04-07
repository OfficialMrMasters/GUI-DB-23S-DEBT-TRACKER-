import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../../Utils/Common";
import users from "../../axios/users.js";

export default function Login(props) {
  const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    return {
      value,
      onChange: handleChange,
    };
  };
  const navigate = useNavigate();
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    // axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
    //   setLoading(false);
    //   setUserSession(response.data.token, response.data.user);
    //   props.history.push('/dashboard');
    // }).catch(error => {
    //   setLoading(false);
    //   if (error.response.status === 401) setError(error.response.data.message);
    //   else setError("Something went wrong. Please try again later.");
    // });
    let userFound = users.find(
      (user) =>
        user.username === username.value && user.password === password.value
    );
    if (userFound) {
      setLoading(false);
      setUserSession(true, userFound);
      return navigate("/dashboard");
    } else {
      setLoading(false);
      setError("Wrong username or password, please try again.");
    }
  };

  return (
    <div className="container">
      <form method="post">
        <h1>Welcome</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          {...username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          {...password}
        />
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <input
          type="button"
          value={loading ? "Loading..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
      </form>
    </div>
  );
}
