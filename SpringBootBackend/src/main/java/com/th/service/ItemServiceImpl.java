package com.th.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.th.dto.ApiResponse;
import com.th.dto.ItemDTO;
import com.th.entity.Item;
import com.th.entity.ItemCategory;
import com.th.exception.ResourceNotFoundException;
import com.th.repository.ItemCategoryRepository;
import com.th.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ItemDTO getItemById(Long id) {
        Item item = itemRepository.findById(id).orElse(null);
        if (item == null) {
            return null;
        }
        return modelMapper.map(item, ItemDTO.class);
    }

    @Override
    public ItemDTO updateItem(ItemDTO itemDTO) {
        Item item = modelMapper.map(itemDTO, Item.class);
        ItemCategory itemCategory = itemCategoryRepository.findById(itemDTO.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Item category not found"));
        item.setCategory(itemCategory);
        item = itemRepository.save(item);
        return modelMapper.map(item, ItemDTO.class);
    }
    

    @Override
    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll().stream()
                .map(item -> modelMapper.map(item, ItemDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResponse addItem(ItemDTO itemDTO) {
    	System.out.println("add new item"+ itemDTO);
    	ItemCategory itemCategory = itemCategoryRepository.findById(itemDTO.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Item category not found"));
        Item item = modelMapper.map(itemDTO, Item.class);
        
        item.setCategory(itemCategory);
        
        System.out.println("setcategory"+itemCategory);
        item = itemRepository.save(item);
        //return modelMapper.map(item, ItemDTO.class);
        return new ApiResponse("Item Added Sucessfully");
    }

    @Override
    public void deleteItemById(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public List<ItemDTO> getAllItemsWithCategory() {
        return itemRepository.findAll().stream()
                .map(item -> {
                    ItemDTO itemDTO = modelMapper.map(item, ItemDTO.class);
                    itemDTO.setCategoryId(item.getId());
                    
                    return itemDTO;
                }).collect(Collectors.toList());
    }

    @Override
    public List<ItemDTO> searchItems(String query) {
        return itemRepository.findByNameContaining(query).stream()
                .map(item -> {
                    ItemDTO itemDTO = modelMapper.map(item, ItemDTO.class);
                    
                    return itemDTO;
                }).collect(Collectors.toList());
    }
}
