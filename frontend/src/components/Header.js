import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar variant='dark' expand='lg' className='py-3 py-lg-1' sticky='top' collapseOnSelect>
        <Container fluid className="navbarContainer">
          <LinkContainer to='/'>
            <Navbar.Brand>Ghost Helper</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/phasmo'>
                <Nav.Link>
                  <i className='fas fa-phasmo' /> Phasmophobia
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/obsideo'>
              <Nav.Link>
                <i className='fas fa-obsideo' /> Obsideo
              </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
