package com.fitness.randevu.repository;

import com.fitness.randevu.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    // Gerekirse özel sorgular buraya eklenebilir
}
