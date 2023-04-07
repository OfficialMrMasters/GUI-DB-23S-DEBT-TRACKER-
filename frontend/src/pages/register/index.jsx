import React from "react";

export default function index() {
  return (
    <div className="container">
      <form>
        <h1>Register</h1>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="fname"
          required
        />
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lname"
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
