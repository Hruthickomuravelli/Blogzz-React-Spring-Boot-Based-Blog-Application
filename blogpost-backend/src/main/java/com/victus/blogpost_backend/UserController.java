package com.victus.blogpost_backend;

import com.victus.blogpost_backend.model.User;
import com.victus.blogpost_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        User registeredUser = userService.registerUser(user);

        if(registeredUser != null){
            return new ResponseEntity<>(registeredUser,HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>("Email already Exists", HttpStatus.CONFLICT);
        }


    }

    @PostMapping("/userlogin")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        User loggeginUser = userService.loginUser(user.getEmail(), user.getPassword());

        if(loggeginUser != null){
            return new ResponseEntity<>(loggeginUser, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/allusers")
    public List<User> getAllUsers(){

        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        Optional<User> user = userService.getUserById(id);

        if(user != null){
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
