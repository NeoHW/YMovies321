'use client';

import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { useAuthContext } from '../src/app/context/AuthContext';
import { useRouter } from 'next/router';

const NavbarComp = () => {
  const { user, logout, login } = useAuthContext();
  const router = useRouter();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Blog Articles</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link
                  onClick={() => {
                    router.push('/auth');
                  }}
                >
                  Settings
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              // Show `login` and `Signup` link if the user hasn't logged in yet
              <>
                <Nav.Link
                  onClick={() => {
                    login({ popup: true });
                    router.push('/');
                  }}
                >
                  Signup
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    login({ popup: true });
                    router.push('/');
                  }}
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
