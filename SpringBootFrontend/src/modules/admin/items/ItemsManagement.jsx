import { Routes, Route, Navigate } from 'react-router-dom';
import ItemsTabs from './components/ItemsTabs';
import ManageItems from './components/ManageItems';
import ManageCategories from './components/ManageCategories';

const ItemsManagement = () => {
  return (
    <Routes>
      <Route element={<ItemsTabs />}>
        <Route index element={<Navigate to="manage" replace />} />
        <Route path="manage" element={<ManageItems />} />
        <Route path="categories" element={<ManageCategories />} />
      </Route>
    </Routes>
  );
};

export default ItemsManagement;