import { Outlet } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const ItemsTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Items Management</h2>
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="manage"
            active={currentPath === 'manage'}
          >
            Manage Items
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="categories"
            active={currentPath === 'categories'}
          >
            Manage Categories
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </Container>
  );
};

export default ItemsTabs;