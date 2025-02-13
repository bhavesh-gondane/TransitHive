package com.th.service;

import com.th.dto.ItemCategoryDTO;
import java.util.List;

public interface ItemCategoryService {
    ItemCategoryDTO getItemCategoryById(Long id);
    ItemCategoryDTO updateItemCategory(ItemCategoryDTO itemCategoryDTO);
    List<ItemCategoryDTO> getAllItemCategories();
    ItemCategoryDTO createItemCategory(ItemCategoryDTO itemCategoryDTO);
    void deleteItemCategoryById(Long id);
}


