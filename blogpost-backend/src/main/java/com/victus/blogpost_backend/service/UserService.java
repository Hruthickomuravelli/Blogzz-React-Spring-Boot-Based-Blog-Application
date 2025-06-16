package com.victus.blogpost_backend.service;

import com.victus.blogpost_backend.model.User;
import com.victus.blogpost_backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()){
            return null;
        }

        return userRepository.save(user);
    }

    public User loginUser(String email, String password){
        Optional<User> findByEmail = userRepository.findByEmail(email);
        User user = findByEmail.orElse(null);

        if(user != null) {
            if(Objects.equals(password,user.getPassword())){
                return user;
            }
        }
        return null;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(long id){
        return userRepository.findById(id);
    }

    public User updateUser(User user){
        return userRepository.save(user);
    }
}
