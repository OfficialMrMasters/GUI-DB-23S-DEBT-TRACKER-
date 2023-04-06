import './App.css';
import axios from 'axios';
import { useState } from 'react';
function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const url = 'http://localhost:8000'

  const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const user = {
    "first": "Hayden",
    "last": "Center",
    "age": 22,
    "admin": true,
    "user_pass": "123",
    "user_login": "12345"
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
  let welcomeMessageElement = document.getElementById("welcome");
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
    console.log("hi");
    axios.post(url + '/checkuser', { username, password }).then((res) => {
      console.log("HELLO");
      console.log(res.data.first_name);
      alert(res.data);
      //console.log(user);
      const user = res.data;
      setUsername(res.data.first_name);
      console.log('User found:', user);
      welcomeMessageElement.innerText = "hello, " + res.data.first_name;
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
      <h1>Hello, </h1>
      <div id="welcome">Hello</div>
    </div>
  );
}

export default App;
