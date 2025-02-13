package com.th.service;

import java.util.List;

import com.th.dto.PaymentDTO;

public interface PaymentService {
    PaymentDTO getPaymentById(Long id);
    PaymentDTO savePayment(PaymentDTO paymentDTO);
    List<PaymentDTO> getAllPayments();
    PaymentDTO updatePaymentStatus(Long id, PaymentDTO.PaymentStatus status);
}
