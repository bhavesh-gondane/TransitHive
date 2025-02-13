package com.th.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.ApiResponse;
import com.th.dto.ItemDTO;
import com.th.service.ItemService;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins="*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        ItemDTO itemDTO = itemService.getItemById(id);
        if (itemDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Item not found"));
        }
        return ResponseEntity.ok(itemDTO);
    }

    @PostMapping
    public ResponseEntity<?> addItem(@RequestBody ItemDTO itemDTO) {
        //ItemDTO newItem = itemService.addItem(itemDTO);
       System.out.println("in add item" + itemDTO);
    	try {
    	   return ResponseEntity.status(HttpStatus.CREATED).body(itemService.addItem(itemDTO));
	} catch (Exception e) {
		// TODO: handle exception
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
	}
       
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateItem(@PathVariable Long id, @RequestBody ItemDTO itemDTO) {
        itemDTO.setId(id);
        ItemDTO updatedItem = itemService.updateItem(itemDTO);
        return ResponseEntity.ok(new ApiResponse("Item updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteItem(@PathVariable Long id) {
        try {
            itemService.deleteItemById(id);
            return ResponseEntity.ok(new ApiResponse("Item deleted successfully"));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(500).body(new ApiResponse("Error deleting item: " + ex.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> itemList = itemService.getAllItemsWithCategory();
        System.out.println("itemlist in item controller"+itemList);
        return ResponseEntity.ok(itemList);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ItemDTO>> searchItems(@RequestParam String query) {
        List<ItemDTO> itemList = itemService.searchItems(query);
        return ResponseEntity.ok(itemList);
    }
    
    
   
    
}
