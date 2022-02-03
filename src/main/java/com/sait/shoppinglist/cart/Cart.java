package com.sait.shoppinglist.cart;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sait.shoppinglist.stock.Stock;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "CARTS")
public class Cart {
    @Id
    @SequenceGenerator(
            name = "cart_sequence",
            sequenceName = "cart_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cart_sequence"
    )
    private Long cartId;
    private String customer;

    @ManyToMany(cascade = {
            CascadeType.MERGE
    })
    @JoinTable(
            name = "cart_items",
            joinColumns = @JoinColumn(name = "cartId", referencedColumnName = "cartId"),
            inverseJoinColumns = @JoinColumn(name = "stockId", referencedColumnName = "stockId")
    )
    private Set<Stock> items = new HashSet<>();

    public Cart() {}

    public Cart(String customer) {
        this.customer = customer;
    }

    public Cart(String customer, Set<Stock> items) {
        this.customer = customer;
        this.items = items;
    }

    public Long getId() {
        return cartId;
    }

    public void setId(Long id) {
        this.cartId = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public Set<Stock> getItems() {
        return items;
    }

    public void setItems(Set<Stock> items) {
        this.items = items;
    }

}
