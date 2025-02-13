package com.th.entity;

//import java.math.BigDecimal;
//import java.util.ArrayList;
//import java.util.List;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToMany;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//
//
//@NoArgsConstructor
//@Getter
//@Setter
//@Entity
//@ToString(callSuper = true,exclude= {"category"})
//public class Item extends BaseEntity {
//    @Column(unique = true, length = 150)
//	private String name;
//    private BigDecimal basePrice;
//
//    @ManyToOne
//    @JoinColumn(name = "category_id", nullable = false)
//    private ItemCategory category;
//
////    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL,orphanRemoval = true)
////    private List<Item> item = new ArrayList<>();
//    
//
//	public Item(String name, BigDecimal basePrice) {
//		super();
//		this.name = name;
//		this.basePrice = basePrice;
//	}
//    
//    
//}

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString(callSuper = true, exclude = {"category"})
public class Item extends BaseEntity {
    @Column(unique = true, length = 150)
    private String name;
    private BigDecimal basePrice;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ItemCategory category;

    public Item(String name, BigDecimal basePrice) {
        super();
        this.name = name;
        this.basePrice = basePrice;
    }
}

