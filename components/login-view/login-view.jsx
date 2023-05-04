import { useState } from 'react';

export const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //Object containing our params for our login//
    //May need some adjustment to fit with the API//
    const data = {
      username: username,
      password: password,
    };
    //sends our post request for logging in//
    fetch('https://movie-findr.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          onLogin(username);
        } else {
          alert('Login attempt failed');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>

      <label>
        Password:
        <input
          type='text'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>

      <button type='submit' onSubmit={handleSubmit}>
        Login
      </button>
    </form>
  );
};
