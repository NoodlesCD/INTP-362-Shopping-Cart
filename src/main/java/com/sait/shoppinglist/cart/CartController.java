package com.sait.shoppinglist.cart;


import com.sait.shoppinglist.stock.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/carts")
@CrossOrigin("*")
public class CartController {
    private final CartRepository cartRepository;

    @Autowired
    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @PostMapping("/addcart")
    public void addCart(@RequestBody Cart cart) {
        cartRepository.save(cart);
    }
}
