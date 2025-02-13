import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useItems = (selectedItems = []) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5205/api/Item');
        setItems(response.data);
        setCache(response.data.reduce((acc, item) => {
          acc[item.name.toLowerCase()] = item;
          return acc;
        }, {}));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const searchItems = useCallback(async (query) => {
    if (!query) return [];
    
    try {
      const selectedItemNames = new Set(selectedItems.map(item => 
        item.name.toLowerCase()
      ));

      // First check cache for matching items
      const cacheResults = Object.values(cache).filter(item => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(query.toLowerCase()) && 
               !selectedItemNames.has(itemName);
      });

      if (cacheResults.length > 0) {
        return cacheResults;
      }

      // If not in cache, fetch from server
      const response = await axios.get(`http://localhost:5205/api/Item/search?query=${query}`);
      const filteredResults = response.data.filter(item => 
        !selectedItemNames.has(item.name.toLowerCase())
      );

      // Update cache with new results
      filteredResults.forEach(item => {
        cache[item.name.toLowerCase()] = item;
      });

      return filteredResults;
    } catch (err) {
      console.error('Error searching items:', err);
      return [];
    }
  }, [cache, selectedItems]);

  return { 
    items: items.filter(item => 
      !selectedItems.map(si => si.name.toLowerCase())
        .includes(item.name.toLowerCase())
    ),
    loading, 
    error, 
    searchItems 
  };
};