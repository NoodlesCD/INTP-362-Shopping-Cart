package com.sait.shoppinglist.stock;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sait.shoppinglist.cart.Cart;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "STOCK")
public class Stock {
    @Id
    @SequenceGenerator(
            name = "stock_sequence",
            sequenceName = "stock_sequence",
            allocationSize = 1
    )
    @GeneratedValue (
            strategy = GenerationType.SEQUENCE,
            generator = "stock_sequence"
    )
    private Long stockId;
    private String name;
    private String description;
    private double cost;

    @JsonIgnore
    @ManyToMany(mappedBy = "items")
    private Set<Cart> carts = new HashSet<>();

    public Stock() {}

    public Stock(String name, String description, double cost) {
        this.name = name;
        this.description = description;
        this.cost = cost;
    }

    public Long getId() {
        return stockId;
    }

    public void setId(Long id) {
        this.stockId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Set<Cart> getCarts() {
        return carts;
    }

    public void setCarts(Set<Cart> carts) {
        this.carts = carts;
    }
}
