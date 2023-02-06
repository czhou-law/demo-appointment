import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Header() {
  return (
    <Navbar expand='lg' bg="dark" variant='dark'>
      <Container>
        <Navbar.Brand>
          Appointment
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/appointment">Create</Nav.Link>
            <Nav.Link href="/appointment/search">Find</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;