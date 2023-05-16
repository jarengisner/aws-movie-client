import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../index.scss';
import { Card, Container, Col, Row } from 'react-bootstrap';

export const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //Object containing our params for our login//
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
      //one liner arrow functions you can omit the return and brackets if function is one line//
      .then((response) => response.json())
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
    <Container>
      <Row>
        <Col className='mt-3'>
          <Card>
            <Form onSubmit={handleSubmit} className='m-3'>
              <Form.Group controlId='forUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  value={username}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                    console.log(username);
                  }}
                  placeholder='Username'
                />
              </Form.Group>
              <Form.Group controlId='forPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='text'
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder='Password'
                />
              </Form.Group>
              <Button variant='primary' type='submit' className='mt-3'>
                Log-In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
