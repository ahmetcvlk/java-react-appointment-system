package com.fitness.randevu.repository;

import com.fitness.randevu.entity.AppointmentTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentTimeRepository extends JpaRepository<AppointmentTime, Integer> {
    // Örneğin, bir randevuya ait saatleri çekmek için özel sorgular yazabiliriz
}
