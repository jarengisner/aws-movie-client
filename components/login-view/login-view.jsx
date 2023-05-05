import { useState } from 'react';

export const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //Object containing our params for our login//
    //May need some adjustment to fit with the API//
    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://movie-findr.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          console.log(data.user);
          console.log('successful login');
          onLogin(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        console.log(e);
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
            console.log(username);
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
