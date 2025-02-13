import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function DashboardLayout({ children, title }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <NavLink style={{ textDecoration: 'none' }} onClick={handleReload} ><Navbar.Brand>TransitHive - {title}</Navbar.Brand></NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <span className="navbar-text me-3">
                Welcome, {user?.username}
              </span>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">
        {children}
      </Container>
    </div>
  );
}

export default DashboardLayout;