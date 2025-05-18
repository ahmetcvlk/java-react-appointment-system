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

    // Belirli ID'li randevuyu getir
    public Optional<Appointment> getAppointmentById(int id) {
        return appointmentRepository.findById(id);
    }

    // Yeni randevu oluştur
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Randevuyu sil
    public void deleteAppointment(int id) {
        appointmentRepository.deleteById(id);
    }

    // Bir randevuya ait zamanları getir
    public List<AppointmentTime> getAppointmentTimesByAppointmentId(int appointmentId) {
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(appointmentId);
        return appointmentOpt.map(Appointment::getTimes).orElse(null);
    }

    // Bir randevuya zaman ekle
    public AppointmentTime addTimeToAppointment(AppointmentTime appointmentTime) {
        return appointmentTimeRepository.save(appointmentTime);
    }

    public boolean approveAppointment(int appointmentId) {
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(appointmentId);
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            appointment.setApproved(true);
            appointmentRepository.save(appointment);
            return true;
        }
        return false;
    }


    // Kullanıcıdan gelen bir randevuyu, içindeki zaman bilgileriyle birlikte kaydet
    public Appointment createAppointmentWithTimes(Appointment appointment, List<AppointmentTime> times) {
        // Önce randevuyu veritabanına kaydediyoruz (id oluşturulsun diye)
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Her bir zaman nesnesine bu randevuyu set ediyoruz ve kaydediyoruz
        for (AppointmentTime time : times) {
            time.setAppointment(savedAppointment); // foreign key ilişkisi için gerekli
            appointmentTimeRepository.save(time);
        }

        // Randevu nesnesine zaman listesini ekliyoruz
        savedAppointment.setTimes(times);

        // Sonuç olarak kaydedilmiş randevuyu geri döndürüyoruz
        return savedAppointment;
    }

}
