package com.webapp.eshowroom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.sql.Blob;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@Table(name = "Product")
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String imageType;
    
    @Column(nullable = false)
    private String imageName;
    
    @Lob
    private Blob imageData;

    @Column(nullable = false)
    private Double newPrice;

    @Column(nullable = false)
    private Double oldPrice;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;
    
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

    public OffsetDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(final OffsetDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public OffsetDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(final OffsetDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

	public String getImageType() {
		return imageType;
	}

	public void setImageType(String imageType) {
		this.imageType = imageType;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	
	public Blob getImageData() throws SQLException {
		return imageData;
	}

	public byte[] getImageDataBytes() throws SQLException {
		if(imageData == null) {
			return new byte[] {};
		}
		return imageData.getBytes(1, Integer.parseInt(imageData.length()+""));
	}

	public void setImageData(Blob imageData) {
		this.imageData = imageData;
	}

}
