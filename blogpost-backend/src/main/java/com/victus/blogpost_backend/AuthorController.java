package com.victus.blogpost_backend;

import com.victus.blogpost_backend.model.Author;
import com.victus.blogpost_backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/author/register")
    public ResponseEntity<Author> registerAuthor(@RequestBody Author author){
        Author registeredAuthor = authorService.registerAuthor(author);
        return new ResponseEntity<>(registeredAuthor, HttpStatus.CREATED); // 201 Created
    }

    @PostMapping("/author/login")
    public ResponseEntity<?> loginAuthor(@RequestBody Author author){
        Author loggedinAuthor = authorService.loginAuthor(author.getEmail(), author.getPassword());

        if(loggedinAuthor != null){
            return new ResponseEntity<>(loggedinAuthor, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/authors")
    public List<Author> getAllAuthors(){
        return authorService.getAllAuthors();


    }


}
