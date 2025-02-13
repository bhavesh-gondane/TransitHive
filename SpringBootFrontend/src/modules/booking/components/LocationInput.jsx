import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Form, ListGroup } from 'react-bootstrap';

function LocationInput({ label, onLocationSelect, value }) {
  const {
    ready,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'in' },
    },
    debounce: 300,
    defaultValue: value,
  });

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      onLocationSelect({
        address: description,
        coordinates: { lat, lng }
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search location..."
      />
      {status === 'OK' && (
        <ListGroup className="mt-2 position-absolute w-100 z-1">
          {data.map((suggestion) => (
            <ListGroup.Item
              key={suggestion.place_id}
              action
              onClick={() => handleSelect(suggestion.description)}
            >
              {suggestion.description}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default LocationInput;