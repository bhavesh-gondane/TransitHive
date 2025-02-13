import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CategoryForm = ({ show, onHide, onSubmit, category }) => {
  const [formData, setFormData] = useState({ name: '' });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name });
    } else {
      setFormData({ name: '' });
    }
    setValidated(false);
  }, [category]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity()) {
      onSubmit(formData);
    }
    
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {category ? 'Edit Category' : 'Add New Category'}
        </Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a category name.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {category ? 'Update' : 'Add'} Category
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryForm;