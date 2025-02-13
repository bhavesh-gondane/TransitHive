import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// import { Modal, Form, Button } from 'react-bootstrap';
// import { useState, useEffect } from 'react';

// const ItemForm = ({ show, onHide, onSubmit, item, categories }) => {
  
//   const [formData, setFormData] = useState({
//     name: '',
//     categoryId: '',
//     basePrice: ''
//   });

//   console.log("check item in item form",item);
//   const [validated, setValidated] = useState(false);

//   // useEffect(() => {
//   //   if (item) {
//   //     setFormData({
//   //       name: item.name,
//   //       categoryId: item.categoryId,
//   //       basePrice: item.basePrice.toFixed(2)
//   //     });
//   //   } else {
//   //     setFormData({
//   //       name: '',
//   //       categoryId: '',
//   //       basePrice: ''
//   //     });
//   //   }
//   //   setValidated(false);
//   // }, [item]);

//   useEffect(() => {
//     if (!show) {
//       setFormData({
//         name: '',
//         categoryId: '',
//         basePrice: ''
       
//       });
//       setValidated(false);
//     }
//   }, [show]);
//   console.log("check form data in edit item",formData.categoryId);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
    
//     if (form.checkValidity()) {
//       onSubmit({
//         ...formData,
//         categoryId: parseInt(formData.categoryId),
//         basePrice: parseFloat(formData.basePrice)
//       });
//     }
    
//     setValidated(true);
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>
//           {item ? 'Edit Item' : 'Add New Item'}
//         </Modal.Title>
//       </Modal.Header>
//       <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Item Name</Form.Label>
//             <Form.Control
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               Please provide an item name.
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Category</Form.Label>
//             <Form.Select
//               required
//               value={formData.categoryId}
              
//               onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
//             >
              
//               <option value="">Select Category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a category.
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Base Price</Form.Label>
//             <Form.Control
//               type="number"
//               required
//               min="0"
//               step="0.01"
//               value={formData.basePrice}
//               onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               Please provide a valid base price.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onHide}>
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit">
//             {item ? 'Update' : 'Add'} Item
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// export default ItemForm;


const ItemForm = ({ show, onHide, onSubmit, item, categories }) => {
  
  const [formData, setFormData] = useState({
  name: '',
  categoryId: '',
  basePrice: ''
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
  if (item) {
    setFormData({
    name: item.name,
    categoryId: item.categoryId,
    basePrice: item.basePrice.toFixed(2)
    });
  } else {
    setFormData({
    name: '',
    categoryId: '',
    basePrice: ''
    });
  }
  setValidated(false);
  }, [item]);

  useEffect(() => {
  if (!show) {
    setFormData({
    name: '',
    categoryId: '',
    basePrice: ''
    });
    setValidated(false);
  }
  }, [show]);

  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  
  if (form.checkValidity()) {
    onSubmit({
    ...formData,
    categoryId: parseInt(formData.categoryId),
    basePrice: parseFloat(formData.basePrice)
    });
  }
  
  setValidated(true);
  };

  return (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
    <Modal.Title>
      {item ? 'Edit Item' : 'Add New Item'}
    </Modal.Title>
    </Modal.Header>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Modal.Body>
      <Form.Group className="mb-3">
      <Form.Label>Item Name</Form.Label>
      <Form.Control
        type="text"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Form.Control.Feedback type="invalid">
        Please provide an item name.
      </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Form.Select
        required
        value={formData.categoryId}
        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        Please select a category.
      </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Base Price</Form.Label>
      <Form.Control
        type="number"
        required
        min="0"
        step="0.01"
        value={formData.basePrice}
        onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid base price.
      </Form.Control.Feedback>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
      Cancel
      </Button>
      <Button variant="primary" type="submit">
      {item ? 'Update' : 'Add'} Item
      </Button>
    </Modal.Footer>
    </Form>
  </Modal>
  );
};

export default ItemForm;