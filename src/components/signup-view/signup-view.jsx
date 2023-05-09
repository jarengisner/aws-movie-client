import React, { useState } from 'react';

export const SignUpView = () => {
  const [newUsername, setNewUsername] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);

  const signupHandler = (event) => {
    const data = {
      Username: newUsername,
      Password: newPassword,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://movie-findr.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          response.json();
          alert('Sign Up successful');
          window.location.reload();
        } else {
          alert('Sign Up Failed :(');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //Need to add our event handler to our form element still//
  return (
    <div>
      <form onSubmit={signupHandler}>
        <label>Username</label>
        <input
          type='text'
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
          required
          minLength='3'
        ></input>
        <label>Password</label>
        <input
          type='text'
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          required
        ></input>
        <label>Email</label>
        <input
          type='text'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        ></input>
        <label>Birthday</label>
        <input
          type='date'
          value={birthday}
          onChange={(e) => {
            setBirthday(e.target.value);
          }}
          required
        ></input>
        <button type='submit'></button>
      </form>
    </div>
  );
};
