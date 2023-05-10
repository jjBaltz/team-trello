/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar
      style={{
        backgroundColor: 'transparent',
        border: '1px, solid',
        borderWidth: 'thin',
        borderTop: 'none',
      }}
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Trello</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Create Project</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>Members</Nav.Link>
            </Link>
            <Link passHref href="/user">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
