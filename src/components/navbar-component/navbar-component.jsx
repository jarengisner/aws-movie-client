import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.scss';

export const NavigationBar = ({ user, setQuery }) => {
  //May have to have each conditional return a whole new <Nav> to make button seperate//
  return (
    <Navbar bg='light' expand='lg' fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Movie Findr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {!user && (
            <>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  Signup
                </Nav.Link>
              </Nav>
            </>
          )}
          {user && (
            <>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/user/profile'>
                  Profile
                </Nav.Link>
                <NavDropdown title='Genres' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='/genres/Action'>
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/genres/Horror'>
                    Horror
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/genres/Sci-Fi'>
                    Sci-Fi
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/genres/Drama'>
                    Drama
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/genres/Comedy'>
                    Comedy
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className='justify-content-end'>
                <input
                  placeholder='Search'
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
                ></input>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
