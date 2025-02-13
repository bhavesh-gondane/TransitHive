import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import ItemForm from './forms/ItemForm';
import DeleteConfirmation from './modals/DeleteConfirmation';
import { toast } from 'react-toastify';

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5205/api/Item');
      console.log("items management",response.data);
      setItems(response.data);
      
    } catch (error) {
      toast.error('Error fetching items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5205/api/ItemCategory');
      console.log("categories",response.data);
      setCategories(response.data);
    } catch (error) {
      toast.error('Error fetching categories');
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDelete(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedItem) {
        await axios.put(`http://localhost:5205/api/Item/${selectedItem.id}`, formData);
        toast.success('Item updated successfully');
      } else {
        await axios.post('http://localhost:5205/api/Item', formData);
        toast.success('Item added successfully');
      }
      fetchItems();
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving item');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5205/api/Item/${selectedItem.id}`);
      toast.success('Item deleted successfully');
      fetchItems();
      setShowDelete(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting item');
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.categoryId === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" /> Add Item
        </Button>
        <div className="d-flex gap-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              Category: {selectedCategory === 'all' ? 'All' : categories.find(c => c.id === parseInt(selectedCategory))?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedCategory('all')}>All</Dropdown.Item>
              {categories.map(category => (
                <Dropdown.Item
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <InputGroup style={{ width: '300px' }}>
            <Form.Control
              placeholder="Search items..."
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
            <th>Item Name</th>
            <th>Category</th>
            <th>Base Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              {/* <td>{categories.find(c => c.id === item.categoryId)?.name}</td> */}
              <td>{categories.find(c => c.name === item.categoryName)?.name}</td>
              
              {/* <td>{item.categoryName}</td> */}
              <td>₹{item.basePrice.toFixed(2)}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ItemForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        item={selectedItem}
        categories={categories}
      />

      <DeleteConfirmation
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedItem?.name}
        itemType="item"
      />
    </div>
  );
};

export default ManageItems;