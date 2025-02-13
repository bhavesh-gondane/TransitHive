package com.th.controller;

import com.th.dto.ItemCategoryDTO;
import com.th.exception.ResourceNotFoundException;
import com.th.dto.ApiResponse;
import com.th.service.ItemCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item-categories")
@CrossOrigin(origins="*")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryService itemCategoryService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getItemCategoryById(@PathVariable Long id) {
        ItemCategoryDTO itemCategoryDTO = itemCategoryService.getItemCategoryById(id);
        if (itemCategoryDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResourceNotFoundException(null));
        }
        return ResponseEntity.ok(itemCategoryDTO);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addItemCategory(@RequestBody ItemCategoryDTO itemCategoryDTO) {
        ItemCategoryDTO newItemCategory = itemCategoryService.updateItemCategory(itemCategoryDTO);
        return ResponseEntity.status(201).body(new ApiResponse("Item category created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateItemCategory(@PathVariable Long id, @RequestBody ItemCategoryDTO itemCategoryDTO) {
        itemCategoryDTO.setId(id);
        ItemCategoryDTO updatedItemCategory = itemCategoryService.updateItemCategory(itemCategoryDTO);
        return ResponseEntity.ok(new ApiResponse("Item category updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteItemCategory(@PathVariable Long id) {
        try {
            itemCategoryService.deleteItemCategoryById(id);
            return ResponseEntity.ok(new ApiResponse("Item category deleted successfully"));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(500).body(new ApiResponse("Error deleting item category: " + ex.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<ItemCategoryDTO>> getAllItemCategories() {
        List<ItemCategoryDTO> itemCategoryList = itemCategoryService.getAllItemCategories();
        return ResponseEntity.ok(itemCategoryList);
    }
}