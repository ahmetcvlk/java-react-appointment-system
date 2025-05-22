package com.fitness.randevu.service;

import com.fitness.randevu.entity.User;
import com.fitness.randevu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Tüm kullanıcıları getir
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ID'ye göre kullanıcı getir
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    // Yeni kullanıcı kaydet
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Kullanıcı sil
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    //emaile göre kullanıcı getir
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
