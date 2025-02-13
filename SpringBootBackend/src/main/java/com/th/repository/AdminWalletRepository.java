package com.th.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.th.entity.AdminWallet;
@Repository
public interface AdminWalletRepository extends JpaRepository<AdminWallet, Long>{
		

}
