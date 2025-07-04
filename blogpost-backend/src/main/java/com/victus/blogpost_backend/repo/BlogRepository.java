package com.victus.blogpost_backend.repo;

import com.victus.blogpost_backend.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    List<Blog> findByAuthorId(long authorId);

}
