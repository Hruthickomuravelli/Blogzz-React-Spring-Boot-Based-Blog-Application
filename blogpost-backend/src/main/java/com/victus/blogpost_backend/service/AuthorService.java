package com.victus.blogpost_backend.service;

import com.victus.blogpost_backend.model.Author;
import com.victus.blogpost_backend.repo.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public Author registerAuthor(Author author){
        return authorRepository.save(author);
    }

    public Author loginAuthor(String email, String password){
        Optional<Author> authorByEmail = authorRepository.findByEmail(email);
        Author author = authorByEmail.orElse(null);


        if (author != null) {

            if (Objects.equals(password, author.getPassword())) {
                return author;
            }
        }

        return null;
    }

    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }

    public Optional<Author> getAuthorById(Long id) {
        return authorRepository.findById(id);
    }

    public List<Author> getAllAuthors(){
        return authorRepository.findAll();
    }

    public Author updateAuthor(Author author){
        return authorRepository.save(author);
    }
}
