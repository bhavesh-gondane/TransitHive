package com.th.entity;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.OneToMany;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//
//@NoArgsConstructor
//@Getter
//@Setter
//@Entity
//public class ItemCategory extends BaseEntity {
//    @Column(unique = true, nullable = false)
//    private String name;
//    
//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL,orphanRemoval = true)
//    private List<Item> item = new ArrayList<>();
//
//	public ItemCategory(String name) {
//		super();
//		this.name = name;
//	}
//    
//	public void addItem(Item item) {
//		this.item.add(item);// category -> post
//		item.setCategory(this);// post -> category
//	}
//	
//	public void removeItem(Item item) {
//		this.item.remove(item);// category -> post
//		item.setCategory(null);// post -> category
//	}
//    
//    
//}

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ItemCategory extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items = new ArrayList<>();

    public ItemCategory(String name) {
        super();
        this.name = name;
    }

    public void addItem(Item item) {
        this.items.add(item);
        item.setCategory(this);
    }

    public void removeItem(Item item) {
        this.items.remove(item);
        item.setCategory(null);
    }
}
