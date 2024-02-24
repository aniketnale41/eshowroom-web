package com.webapp.eshowroom.service;

import com.webapp.eshowroom.domain.Product;
import com.webapp.eshowroom.model.ProductDTO;
import com.webapp.eshowroom.repos.ProductRepository;
import com.webapp.eshowroom.util.NotFoundException;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

	private final ProductRepository productRepository;

	@PersistenceContext
	private EntityManager entManager;

	public ProductService(final ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public List<ProductDTO> findAll() {
		final List<Product> products = productRepository.findAll(Sort.by("id"));
		return products.stream().map(product -> mapToDTO(product, new ProductDTO())).toList();
	}

	public ProductDTO get(final Long id) {
		return productRepository.findById(id).map(product -> mapToDTO(product, new ProductDTO()))
				.orElseThrow(NotFoundException::new);
	}
	
	public List<ProductDTO> findAllByCategory(final String category) {
		Specification<Product> productFilterSpec = (root,query,builder) -> builder.like(root.get("category"), "%"+category+"%");
		final List<Product> products = productRepository.findAll(productFilterSpec);
		return products.stream().map(product -> mapToDTO(product, new ProductDTO())).toList();
	} 
	
	public Long create(final ProductDTO productDTO) {
		final Product product = new Product();
		mapToEntity(productDTO, product);
		return productRepository.save(product).getId();
	}

	public void update(final Long id, final ProductDTO productDTO) {
		final Product product = productRepository.findById(id).orElseThrow(NotFoundException::new);
		mapToEntity(productDTO, product);
		productRepository.save(product);
	}

	public void delete(final Long id) {
		productRepository.deleteById(id);
	}

	private ProductDTO mapToDTO(final Product product, final ProductDTO productDTO) {
		productDTO.setId(product.getId());
		productDTO.setName(product.getName());
		productDTO.setCategory(product.getCategory());
		try {
			productDTO.setImageData(product.getImageDataBytes());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		productDTO.setNewPrice(product.getNewPrice());
		productDTO.setOldPrice(product.getOldPrice());
		return productDTO;
	}

	private Product mapToEntity(final ProductDTO productDTO, final Product product) {
		product.setName(productDTO.getName());
		product.setCategory(productDTO.getCategory());
		if(productDTO.getImage() != null) {			
			product.setImageName(productDTO.getImage().getOriginalFilename());
			product.setImageType(productDTO.getImage().getContentType());
			try {
				product.setImageData(((Session) entManager).getLobHelper().createBlob(productDTO.getImage().getBytes()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		product.setNewPrice(productDTO.getNewPrice());
		product.setOldPrice(productDTO.getOldPrice());
		return product;
	}

}
