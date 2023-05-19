import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.scss';

export const NavigationBar = ({ user, onLogOut, setQuery }) => {
  //May have to have each conditional return a whole new <Nav> to make button seperate//
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Movie Findr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!user && (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/user/profile'>
                  Profile
                </Nav.Link>
                <input
                  className='justify-content-end'
                  placeholder='Search'
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
