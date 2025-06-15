package com.victus.blogpost_backend;

import com.victus.blogpost_backend.model.Author;
import com.victus.blogpost_backend.repo.AuthorRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class BlogpostBackendApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(BlogpostBackendApplication.class, args);
		System.out.println("Hello");

//		AuthorRepository repo = context.getBean(AuthorRepository.class);
//
//		Author aut1 = context.getBean(Author.class);
//		Author aut2 = context.getBean(Author.class);
//
//
//		aut1.setEmail("author1@me.com");
//		aut1.setName("Jack");
//		aut1.setPassword("123");
//
//
//		aut2.setEmail("author2@me.com");
//		aut2.setName("Giphis");
//		aut2.setPassword("123");
//
//		repo.save(aut1);
//		repo.save(aut2);


	}

}
