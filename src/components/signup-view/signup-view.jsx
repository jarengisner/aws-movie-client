import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import '../../index.scss';
import { Navigate } from 'react-router';

export const SignUpView = (onSignUp) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const signupHandler = (event) => {
    event.preventDefault();
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
        } else {
          alert('Sign Up Failed :(');
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className='mt-3'>
            <h1 className='login-signup-title'>Sign Up</h1>
            <Form onSubmit={signupHandler} className='m-3'>
              <Form.Group controlId='signupUsername'>
                <Form.Label>Enter a new Username:</Form.Label>
                <Form.Control
                  type='text'
                  value={newUsername}
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                  }}
                  required
                  placeholder='Username'
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
                  placeholder='Password'
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
                  placeholder='Email'
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
              <Button variant='primary' type='submit' className='mt-3'>
                Sign Up
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
