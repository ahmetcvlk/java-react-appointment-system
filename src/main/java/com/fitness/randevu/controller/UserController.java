package com.fitness.randevu.controller;

import com.fitness.randevu.entity.Role;
import com.fitness.randevu.entity.User;
import com.fitness.randevu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Bu e-posta zaten kayıtlı.");
        }

        // NOT: Şifre güvenliği için buraya şifre hash işlemi eklenebilir.
        userRepository.save(user);
        return ResponseEntity.ok("Kayıt başarılı.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Geçersiz e-posta veya şifre.");
        }

        return ResponseEntity.ok(existingUser); // Kullanıcı bilgilerini geri döner
    }
}
