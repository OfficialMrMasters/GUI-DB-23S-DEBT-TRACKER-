import { axios, url } from "./axios";

const checkAPI = () => {
  axios
    .get(url + "/")
    .then((res) => {
      alert(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const user = {
  first: "Hayden",
  last: "Center",
  age: 22,
  admin: true,
};

const sendJSON = () => {
  console.log(user);

  axios
    .put(url + "/parse", user)
    .then((res) => {
      alert(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendUser = () => {
  axios
    .post(url + "/user", user)
    .then((res) => {
      alert(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUsers = () => {
  axios
    .get(url + "/users")
    .then((res) => {
      alert(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const clearUsers = () => {
  axios
    .put(url + "/users/clear")
    .then((res) => {
      alert(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const registerUser = ({
  username,
  first_name,
  last_name,
  age,
  nickname,
  password,
  phone_number,
  email,
  admin,
  setRedirect,
}) => {
  axios
    .post(url + "/register", {
      username: username,
      first_name: first_name,
      last_name: last_name,
      age: age,
      nickname: nickname,
      password: password,
      phone_number: phone_number,
      email: email,
      admin: admin,
    })
    .then(function (response) {
      setRedirect(true);
      alert(response.data);
    })
    .catch(function (error) {
      alert(error);
    });
};

const loginUser = ({ username, password }) => {
  return axios.post(url + "/login", {
    username: username,
    password: password,
  });
};

const getUser = ({ username }) => {
  return axios.post(url + "/getuser", {
    username: username,
  });
};

const updateUser = ({
  id,
  username,
  first_name,
  last_name,
  age,
  nickname,
  password,
  phone_number,
  email,
  admin,
  setRefresh,
  setPrivate,
}) => {
  axios
    .post(`${url}/edit/${id}`, {
      id: id,
      username: username,
      first_name: first_name,
      last_name: last_name,
      age: age,
      nickname: nickname,
      password: password,
      phone_number: phone_number,
      email: email,
      setPrivate: setPrivate,
      admin: admin,
    })
    .then(function (response) {
      setRefresh(true);
      alert(response.data);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

const deleteUser = ({ user_id, setLogout }) => {
  console.log(user_id);
  axios
    .delete(`${url}/delete/${user_id}`)
    .then(function (response) {
      setLogout(true);
      alert(response.data);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

const usersAPI = {
  checkAPI,
  sendJSON,
  sendUser,
  getUsers,
  clearUsers,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};

export default usersAPI;
