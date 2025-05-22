package com.fitness.randevu.repository;

import com.fitness.randevu.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
    List<Appointment> findByUserId(Long userId);

}
