package com.th.service;

import java.util.List;

import com.th.dto.ApiResponse;
import com.th.dto.ItemDTO;

public interface ItemService {
    ItemDTO getItemById(Long id);
    ItemDTO updateItem(ItemDTO itemDTO);
    List<ItemDTO> getAllItems();
    ApiResponse addItem(ItemDTO itemDTO);
    void deleteItemById(Long id);
    List<ItemDTO> getAllItemsWithCategory();
    List<ItemDTO> searchItems(String query);
}
