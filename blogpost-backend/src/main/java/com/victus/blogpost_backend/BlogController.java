package com.victus.blogpost_backend;


import com.victus.blogpost_backend.model.Blog;
import com.victus.blogpost_backend.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/postblog")
    public ResponseEntity<Blog> addBlog(@RequestBody Blog blog){
        Blog createdBlog = blogService.addBlog(blog);

        if(createdBlog != null){
            return new ResponseEntity<>(createdBlog, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getblogs")
    public List<Blog> getAllBlogs(){
        return blogService.getAllBlogs();
    }

    @GetMapping("/getblog/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable long id){
        Optional<Blog> blog =  blogService.getBlogById(id);

        if(blog.isPresent()){
            return new ResponseEntity<>(blog.get(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/blog/author/{authorId}")
    public List<Blog> getByAuthor(@PathVariable long authorId){
        return blogService.getBlogsByAuthor(authorId);
    }

    @DeleteMapping("/deleteblog/{id}") // Added DELETE mapping
    public ResponseEntity<String> deleteBlogById(@PathVariable long id){
        blogService.deleteBlogById(id);
        return new ResponseEntity<>("Blog post with ID " + id + " deleted successfully", HttpStatus.OK); // 204 No Content
    }

}
