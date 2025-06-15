package com.victus.blogpost_backend.repo;

import com.victus.blogpost_backend.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
        Optional<Author> findByEmail(String email);
        Optional<Author> findByName(String username);
        Optional<Author> findByEmailOrName(String email, String username);
}
