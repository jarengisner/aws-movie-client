import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Movie Findr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>{/* Add Links here */}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
