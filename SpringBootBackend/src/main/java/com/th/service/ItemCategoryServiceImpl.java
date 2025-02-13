//package com.th.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.th.dto.ItemCategoryDTO;
//import com.th.entity.ItemCategory;
//import com.th.repository.ItemCategoryRepository;
//
//@Service
//public class ItemCategoryServiceImpl implements ItemCategoryService {
//
//    @Autowired
//    private ItemCategoryRepository itemCategoryRepository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Override
//    public ItemCategoryDTO getItemCategoryById(Long id) {
//        ItemCategory itemCategory = itemCategoryRepository.findById(id).orElse(null);
//        if (itemCategory == null) {
//            return null;
//        }
//        return modelMapper.map(itemCategory, ItemCategoryDTO.class);
//    }
//
//    @Override
//    public ItemCategoryDTO updateItemCategory(ItemCategoryDTO itemCategoryDTO) {
//        ItemCategory itemCategory = modelMapper.map(itemCategoryDTO, ItemCategory.class);
//        itemCategory = itemCategoryRepository.save(itemCategory);
//        return modelMapper.map(itemCategory, ItemCategoryDTO.class);
//    }
//
//    @Override
//    public List<ItemCategoryDTO> getAllItemCategories() {
//        return itemCategoryRepository.findAll().stream()
//                .map(itemCategory -> modelMapper.map(itemCategory, ItemCategoryDTO.class))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public ItemCategoryDTO createItemCategory(ItemCategoryDTO itemCategoryDTO) {
//        // Convert DTO to entity
//        ItemCategory itemCategory = modelMapper.map(itemCategoryDTO, ItemCategory.class);
//        
//        // Save the entity to the database
//        itemCategory = itemCategoryRepository.save(itemCategory);
//        
//        // Convert the saved entity back to DTO
//        return modelMapper.map(itemCategory, ItemCategoryDTO.class);
//    }
//
//}




package com.th.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.th.dto.ItemCategoryDTO;
import com.th.entity.ItemCategory;
import com.th.exception.ResourceNotFoundException;
import com.th.repository.ItemCategoryRepository;

@Service
@Transactional
public class ItemCategoryServiceImpl implements ItemCategoryService {

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ItemCategoryDTO getItemCategoryById(Long id) {
        ItemCategory itemCategory = itemCategoryRepository.findById(id).orElse(null);
        if (itemCategory == null) {
            throw new ResourceNotFoundException("Item Category Not Found");
        }
        return modelMapper.map(itemCategory, ItemCategoryDTO.class);
    }

    @Override
    public ItemCategoryDTO updateItemCategory(ItemCategoryDTO itemCategoryDTO) {
        ItemCategory itemCategory = modelMapper.map(itemCategoryDTO, ItemCategory.class);
        
        itemCategory = itemCategoryRepository.save(itemCategory);
        return modelMapper.map(itemCategory, ItemCategoryDTO.class);
    }

    @Override
    public List<ItemCategoryDTO> getAllItemCategories() {
        return itemCategoryRepository.findAll().stream()
                .map(itemCategory -> modelMapper.map(itemCategory, ItemCategoryDTO.class))
                .collect(Collectors.toList());
    }
    
    @Override
    public ItemCategoryDTO createItemCategory(ItemCategoryDTO itemCategoryDTO) {
        // Convert DTO to entity
        ItemCategory itemCategory = modelMapper.map(itemCategoryDTO, ItemCategory.class);
        
        // Save the entity to the database
        itemCategory = itemCategoryRepository.save(itemCategory);
        
        // Convert the saved entity back to DTO
        return modelMapper.map(itemCategory, ItemCategoryDTO.class);
    }

    @Override
    public void deleteItemCategoryById(Long id) {
    	ItemCategory itemCategory = itemCategoryRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("ItemCategory Not Found"));
        itemCategoryRepository.deleteById(id);
    }
}
