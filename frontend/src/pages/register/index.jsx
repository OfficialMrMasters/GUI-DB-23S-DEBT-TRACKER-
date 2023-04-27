import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import usersAPI from "../../api/usersApi";

export default function Register() {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    age: "",
    admin: false,
    nickname: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    usersAPI.registerUser({
      username: data.username,
      first_name: data.fname,
      last_name: data.lname,
      age: data.age,
      nickname: data.nickname,
      password: data.password,
      phone_number: data.phone,
      email: data.email,
      admin: data.admin,
      setRedirect: setRedirect,
    });
    // axios.post("https://reqres.in/api/login", userData).then((response) => {
    //   console.log(response.status, response.data.token);
    // });
  };

  useEffect(() => {
    if (redirect) navigate("/login");
  }, [navigate, redirect]);

  return (
    <div className="container">
      <form className="reglog" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="flex-inputs">
          <div className="input-wrapper">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="fname"
              required
              value={data.fname}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lname"
              required
              value={data.lname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex-inputs">
          <div className="input-wrapper">
            <label htmlFor="Nickname">Nickname</label>
            <input
              type="text"
              placeholder="Enter Nickname"
              name="nickname"
              value={data.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              name="age"
              min="18"
              max="100"
              required
              value={data.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex-inputs">
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              value={data.email}
              onChange={handleChange}
            ></input>
          </div>
          <div className="input-wrapper">
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              required
              value={data.phone}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="flex-inputs">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={data.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
