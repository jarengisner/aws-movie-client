import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.scss';

export const UserSettings = (user, token) => {
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');

  const updateHandler = (event) => {
    event.preventDefault();
    const data = {
      Username: updatedUsername,
      Password: updatedPassword,
    };

    fetch(`https://movie-findr.herokuapp.com/users/${user.user.Username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
          alert('Update Successful');
          window.location.reload();
        } else {
          alert('Update failed');
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <Form onSubmit={updateHandler}>
        <Form.Label>Enter New Username</Form.Label>
        <Form.Control
          type='text'
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          placeholder='New Username'
        ></Form.Control>
        <Form.Label>Enter New Password</Form.Label>
        <Form.Control
          type='text'
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
          placeholder='New Password'
        ></Form.Control>
        <Button variant='primary' type='submit' className='mt-3'>
          Update
        </Button>
      </Form>
      <Link to={'/user/profile'}>
        <Button type='primary'>Back</Button>
      </Link>
    </div>
  );
};
