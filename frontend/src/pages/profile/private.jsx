import { useParams, useNavigate } from "react-router-dom";
import usersAPI from "../../api/usersApi";
import { useEffect, useState } from "react";
import { setUserSession, getUser } from "../../Utils/Common";

export default function Private() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
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
    usersAPI.updateUser({
      id: userInfo.user_id,
      username: data.username,
      first_name: data.fname,
      last_name: data.lname,
      age: data.age,
      nickname: data.nickname,
      password: data.password,
      phone_number: data.phone,
      email: data.email,
      admin: data.admin,
      setRefresh: setRefresh,
    });
    setUserSession(true, {
      user_id: userInfo.user_id,
      username: data.username,
      first_name: data.fname,
      last_name: data.lname,
      age: data.age,
      nickname: data.nickname,
      password: data.password,
      phone_number: data.phone,
      email: data.email,
      admin: data.admin,
    });
  };

  useEffect(() => {
    if (refresh) navigate(`/profile/${getUser().username}`);

    usersAPI
      .getUser({ username })
      .then(function (response) {
        setUserInfo(response.data);
        setData({
          username: response.data.username,
          password: response.data.password,
          fname: response.data.first_name,
          lname: response.data.last_name,
          age: response.data.age,
          admin: response.data.admin,
          nickname: response.data.nickname,
          phone: response.data.phone_number,
          email: response.data.email,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [username, navigate, refresh]);

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <div className="img-wrapper profile-img">
            <img
              src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
              alt="profile"
            />
          </div>
          <div className="name">
            <span>{`${userInfo.first_name} ${userInfo.last_name}`}</span>
          </div>
          <div className="wrapper">
            <div className="username">
              <span className="title">Username: </span>
              <span>{userInfo.username}</span>
            </div>
            <div className="friends">
              <span className="title">Friends: </span>
              <ul>
                <li>You have no friends {":("}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="title">
            <h3>Settings</h3>
          </div>
          <div className="wrapper">
            <form className="gen-form" onSubmit={handleSubmit}>
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
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
