package com.sait.shoppinglist.stock;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StockGeneration {

    @Bean
    CommandLineRunner commandLineRunner(StockRepository stockRepository) {
        return args -> {
            Stock keyboard = new Stock("Keyboard", "A flashy keyboard", 24.99);
            Stock mouse = new Stock("Mouse", "An office mouse", 22.00);
            Stock mousepad = new Stock("Mousepad", "Pad for the mouse", 10.11);
            Stock box = new Stock("Box", "A really big box", 19.99);
            Stock tv = new Stock("Television", "An HD flatscreen", 125.00);
            Stock hdmi = new Stock("HDMI", "A 20ft cable", 4.99);

            stockRepository.save(keyboard);
            stockRepository.save(mouse);
            stockRepository.save(mousepad);
            stockRepository.save(box);
            stockRepository.save(tv);
            stockRepository.save(hdmi);
        };
    }
}
