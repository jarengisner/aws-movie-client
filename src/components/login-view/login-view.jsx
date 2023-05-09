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
      //I think that we need to send as URL parameters//
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        //data is undefined when reaching this point//
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
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
    <form onSubmit={handleSubmit}>
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

      <button type='submit'>Login</button>
    </form>
  );
};
