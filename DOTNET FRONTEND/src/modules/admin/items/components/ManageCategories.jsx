import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import CategoryForm from './forms/CategoryForm';
import DeleteConfirmation from './modals/DeleteConfirmation';
import { toast } from 'react-toastify';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5205/api/ItemCategory');
      setCategories(response.data);
    } catch (error) {
      toast.error('Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDelete(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedCategory) {
        await axios.put(`http://localhost:5205/api/ItemCategory/${selectedCategory.id}`, formData);
        toast.success('Category updated successfully');
      } else {
        await axios.post('http://localhost:5205/api/ItemCategory', formData);
        toast.success('Category added successfully');
      }
      fetchCategories();
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving category');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5205/api/ItemCategory/${selectedCategory.id}`);
      toast.success('Category deleted successfully');
      fetchCategories();
      setShowDelete(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting category');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" /> Add Category
        </Button>
        <div className="w-25">
          <InputGroup>
            <Form.Control
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleEdit(category)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(category)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CategoryForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        category={selectedCategory}
      />

      <DeleteConfirmation
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedCategory?.name}
        itemType="category"
      />
    </div>
  );
};

export default ManageCategories;