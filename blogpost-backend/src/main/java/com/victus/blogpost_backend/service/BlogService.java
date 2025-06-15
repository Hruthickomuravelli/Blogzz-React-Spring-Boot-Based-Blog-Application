package com.victus.blogpost_backend.service;

import com.victus.blogpost_backend.model.Author;
import com.victus.blogpost_backend.model.Blog;
import com.victus.blogpost_backend.repo.AuthorRepository;
import com.victus.blogpost_backend.repo.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private AuthorRepository authorRepository;

    public Blog addBlog(Blog blog){
        Optional<Author> existingAuthor = authorRepository.findById(blog.getAuthor().getId());

        if(existingAuthor.isPresent()){
            blog.setAuthor(existingAuthor.get());
            return blogRepository.save(blog);
        }
//        existingAuthor.ifPresent(blog::setAuthor);
        else{
            System.out.println(blog.getAuthor().getId() + "Not Found in Database");
            return null;
        }
    }

    public List<Blog> getAllBlogs(){
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(long id){
        return blogRepository.findById(id);
    }

    public List<Blog> getBlogsByAuthor(long authorId){
        return blogRepository.findByAuthorId(authorId);
    }

    public void deleteBlogById(long id){
        blogRepository.deleteById(id);
    }

}
