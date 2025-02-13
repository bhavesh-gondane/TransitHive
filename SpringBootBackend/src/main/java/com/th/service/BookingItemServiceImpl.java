package com.th.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.th.dto.BookingItemDTO;
import com.th.entity.BookingItem;
import com.th.repository.BookingItemRepository;

@Service
@Transactional

public class BookingItemServiceImpl implements BookingItemService {

    @Autowired
    private BookingItemRepository bookingItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BookingItemDTO getBookingItemById(Long id) {
        BookingItem bookingItem = bookingItemRepository.findById(id).orElse(null);
        if (bookingItem == null) {
            return null;
        }
        return modelMapper.map(bookingItem, BookingItemDTO.class);
    }

    @Override
    public BookingItemDTO saveBookingItem(BookingItemDTO bookingItemDTO) {
        BookingItem bookingItem = modelMapper.map(bookingItemDTO, BookingItem.class);
        
        bookingItem = bookingItemRepository.save(bookingItem);
        
        return modelMapper.map(bookingItem, BookingItemDTO.class);
        
    }

    @Override
    public List<BookingItemDTO> getAllBookingItems() {
        return bookingItemRepository.findAll().stream()
                .map(bookingItem -> modelMapper.map(bookingItem, BookingItemDTO.class))
                .collect(Collectors.toList());
    }
}
