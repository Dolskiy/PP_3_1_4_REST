package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> findAllUsers();

    User findUserById(Long userId);

    void saveUser(User user);

    boolean updateUser(Long id, User user);

    boolean deleteUser(Long userId);

    User findByEmail(String email);


}
