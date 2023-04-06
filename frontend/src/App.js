import axios from 'axios';
import { useState } from 'react';
import Signup from './signup';
function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const url = 'http://localhost:8000'

  const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const user = {
    "user_id": 155,
    "first_name": "Hayden",
    "last_name": "Center",
    "age": 22,
    "admin": "1",
    "username": "123",
    "nickname": "none",
    "phone_number": "9135553353",
    "email": "joe@gmail.com",
    "password": "12345"
  }

  const sendJSON = () => {
    console.log(user)

    axios.put(url + '/parse', user).then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const sendUser = () => {
    
    axios.post(url + '/user', user).then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  let welcomeMessageElement = document.getElementById("welcome-text");
  const getUsers = () => {
    axios.get(url + '/users').then((res) => {
      alert(JSON.stringify(res.data))
    }).catch((err) => {
      console.log(err)
    })
  }

  const clearUsers = () => {
    axios.put(url + '/users/clear').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const checkUser = (event) =>{
    event.preventDefault();
    axios.post(url + '/checkuser', { username, password }).then((res) => {
      console.log(res.data.first_name);
      //console.log(user);
      const user = res.data;
      setUsername(res.data.first_name);
      console.log('User found:', user);
      welcomeMessageElement.innerText = "hello, " + res.data.first_name;
      setUserData(res.data);
    })
    .catch(error => {
      console.error('Error checking users:', error);
      setError('Invalid username or password.');
    });
  }

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <button onClick={checkAPI}>Check API</button>
      <button onClick={sendJSON}>Send JSON</button>
      <button onClick={sendUser}>Send User to DB</button>
      <button onClick={getUsers}>Get Users from DB</button>
      <button onClick={clearUsers}>Clear Users in DB</button>
      <form onSubmit={checkUser}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Enter Username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit" onClick={checkUser}>Login</button>
        
      </form>
      <div id="welcome">
        <h1 id="welcome-text">Hello</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Admin</th>
              <th>Nickname</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.username}</td>
              <td>{userData.password}</td>
              <td>{userData.first_name}</td>
              <td>{userData.last_name}</td>
              <td>{userData.age}</td>
              <td>{userData.admin}</td>
              <td>{userData.nickname}</td>
              <td>{userData.phone_number}</td>
              <td>{userData.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Signup></Signup>
    </div>
  );
}

export default App;
