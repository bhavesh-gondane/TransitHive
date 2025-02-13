package com.th.service;

import java.util.List;

import com.th.dto.BookingItemDTO;

public interface BookingItemService {
    BookingItemDTO getBookingItemById(Long id);
    BookingItemDTO saveBookingItem(BookingItemDTO bookingItemDTO);
    List<BookingItemDTO> getAllBookingItems();
}
