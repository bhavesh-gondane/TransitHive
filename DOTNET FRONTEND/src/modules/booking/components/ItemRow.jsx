import React, { useState, useCallback } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useItems } from '../hooks/useItems';
import debounce from 'lodash/debounce';

function ItemRow({ item, index, updateItem, removeItem, isLastItem, selectedItems }) {
  const { items, searchItems } = useItems(selectedItems);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSuggestions(items);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const results = await searchItems(query);
      setSuggestions(results);
      setIsSearching(false);
    }, 300),
    [searchItems, items]
  );

  const handleItemSelect = (selected) => {
    if (selected && selected.length > 0) {
      const selectedItem = selected[0];
      updateItem(index, 'name', selectedItem.name);
      updateItem(index, 'basePrice', selectedItem.basePrice);
    }
  };

  const handleSearch = (query) => {
    setIsSearching(true);
    debouncedSearch(query);
  };

  return (
    <div className="row g-3 align-items-end mb-3">
      <div className="col-12 col-sm-6">
        <label className="form-label">Item Name</label>
        <Typeahead
          id={`item-${index}`}
          options={suggestions.length ? suggestions : items}
          labelKey="name"
          onChange={handleItemSelect}
          onInputChange={handleSearch}
          placeholder="Start typing item name..."
          selected={item.name ? [{ name: item.name, basePrice: item.basePrice }] : []}
          renderMenuItemChildren={(option) => (
            <div>
              {option.name} - ₹{option.basePrice} 
            </div>
          )}
          isLoading={isSearching}
        />
      </div>
      <div className="col-8 col-sm-4">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          required
          min="1"
          value={item.quantity}
          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
        />
      </div>
      <div className="col-4 col-sm-2">
        <button
          type="button"
          className="btn btn-danger w-100"
          onClick={() => removeItem(index)}
          disabled={isLastItem}
        >
          Remove
        </button>
      </div>
      {/* {item.basePrice > 0 && (
        <div className="col-12">
          <small className="text-muted">
            Item Cost: ₹{item.basePrice} × {item.quantity} = ₹{item.basePrice * item.quantity}
          </small>
        </div>
      )} */}
    </div>
  );
}

export default ItemRow;