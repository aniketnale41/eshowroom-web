package com.webapp.eshowroom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class EshowroomApplication {

    public static void main(final String[] args) {
        SpringApplication.run(EshowroomApplication.class, args);
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
        	
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                CorsRegistration reg = registry.addMapping("/api/**");
                reg.allowedOrigins("http://localhost:3000");
                reg.allowedMethods(CorsConfiguration.ALL);
            }
        };
    } 

}
