import axios from 'axios';
import { useState } from 'react';

function SignUpForm() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number,setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const url = 'http://localhost:8000';

  const handleSignUp = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    var admin = false;
    var age = 34;
    var nickname =[];
    const userData = { first_name, last_name, email, password, phone_number, username,age,admin,nickname };
    axios.post(`${url}/signup`, userData)
      .then((response) => {
        console.log(response.data);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        setError('Error signing up.');
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={first_name} onChange={(event) => setFirstName(event.target.value)} required />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={last_name} onChange={(event) => setLastName(event.target.value)} required />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <label htmlFor="phone_number">Phone Number</label>
        <input type="phone_number" id="phone_number" value={phone_number} onChange={(event) => setPhoneNumber(event.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      
    </div>
    
  );
}

export default SignUpForm;
