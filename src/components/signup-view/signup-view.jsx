import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

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
      {/* <form onSubmit={signupHandler}>
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
        <button type='submit'>Sign up</button>
      </form>  */}

      <Form onSubmit={signupHandler}>
        <Form.Group controlId='signupUsername'>
          <Form.Label>Enter a new Username:</Form.Label>
          <Form.Control
            type='text'
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId='signupPass'>
          <Form.Label>Enter a new password:</Form.Label>
          <Form.Control
            type='text'
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId='signupEmail'>
          <Form.Label>Enter your email:</Form.Label>
          <Form.Control
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId='signupBirthday'>
          <Form.Label>Enter your Birthay:</Form.Label>
          <Form.Control
            type='date'
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
