package com.pokermentor.webui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.pokermentor")
@EntityScan(basePackages = "com.pokermentor.entity")
@EnableJpaRepositories(basePackages = "com.pokermentor.repository")
public class WebUIApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebUIApplication.class, args);
    }
}