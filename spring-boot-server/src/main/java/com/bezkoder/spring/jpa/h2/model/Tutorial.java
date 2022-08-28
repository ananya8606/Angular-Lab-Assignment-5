package com.bezkoder.spring.jpa.h2.model;

import javax.persistence.*;

@Entity
@Table(name = "movies")
public class Tutorial {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "category")
	private String category;

	@Column(name = "name")
	private String name;

	@Column(name = "rating")
	private String rating;

	public Tutorial() {

	}

	public Tutorial(String category, String name, String rating) {
		this.category = category;
		this.name = name;
		this.rating = rating;
	}

	public long getId() {
		return id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}
	public String getRating() {
		return rating;
	}
	public void setName(String name) {
		this.name = name;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", category=" + category + ", name=" + name + ", rating=" + rating + "]";
	}

}
