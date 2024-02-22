package com.webapp.eshowroom.model;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class ProductDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String name;

    @NotNull
    @Size(max = 255)
    private String category;

    @NotNull
    @JsonIgnore
    private MultipartFile image;
    
    private byte[] imageData;

    @NotNull
    private Double newPrice;

    @NotNull
    private Double oldPrice;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(final String category) {
        this.category = category;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(final MultipartFile image) {
        this.image = image;
    }

    public Double getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(final Double newPrice) {
        this.newPrice = newPrice;
    }

    public Double getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(final Double oldPrice) {
        this.oldPrice = oldPrice;
    }

	public byte[] getImageData() {
		return imageData;
	}

	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

}
