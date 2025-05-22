package com.fitness.randevu.service;

import com.fitness.randevu.entity.Appointment;
import com.fitness.randevu.entity.AppointmentTime;
import com.fitness.randevu.repository.AppointmentRepository;
import com.fitness.randevu.repository.AppointmentTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentTimeRepository appointmentTimeRepository;

    // Tüm randevuları getir
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    //Belirli kullanıcıya ait randevuları getir
    public List<Appointment> getAppointmentsByUserId(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    //Verilen appointment id'ye göre tek bir randevu getir
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    //Bir randevuyu kaydeder
    public void saveAppointment(Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    //Zamanlarla beraber bir randevuyu kaydeder
    public Appointment createAppointmentWithTimes(Appointment appointment) {
        for (AppointmentTime time : appointment.getTimes()) {
            time.setAppointment(appointment);
        }
        return appointmentRepository.save(appointment);
    }



}
