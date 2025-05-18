package com.fitness.randevu.repository;


import com.fitness.randevu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Gerekirse özel sorgular buraya eklenebilir
    User findByEmail(String email);
}
