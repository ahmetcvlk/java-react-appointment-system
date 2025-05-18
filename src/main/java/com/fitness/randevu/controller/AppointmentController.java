package com.fitness.randevu.controller;

import com.fitness.randevu.entity.Appointment;
import com.fitness.randevu.entity.AppointmentTime;
import com.fitness.randevu.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Tüm randevuları getir
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // Belirli ID'li randevuyu getir
    @GetMapping("/{id}")
    public Optional<Appointment> getAppointmentById(@PathVariable int id) {
        return appointmentService.getAppointmentById(id);
    }

    // Yeni randevu oluştur (zamanlar olmadan)
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    // Yeni randevu oluştur (zamanlarla birlikte)
    @PostMapping("/with-times")
    public Appointment createAppointmentWithTimes(@RequestBody AppointmentWithTimesRequest request) {
        return appointmentService.createAppointmentWithTimes(request.getAppointment(), request.getTimes());
    }

    // Randevuya zaman ekle
    @PostMapping("/add-time")
    public AppointmentTime addTimeToAppointment(@RequestBody AppointmentTime time) {
        return appointmentService.addTimeToAppointment(time);
    }

    // Randevuyu sil
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable int id) {
        appointmentService.deleteAppointment(id);
    }

    // Randevuyu onayla
    @PutMapping("/{id}/approve")
    public boolean approveAppointment(@PathVariable int id) {
        return appointmentService.approveAppointment(id);
    }

    // Bir randevuya ait zamanları getir
    @GetMapping("/{id}/times")
    public List<AppointmentTime> getAppointmentTimes(@PathVariable int id) {
        return appointmentService.getAppointmentTimesByAppointmentId(id);
    }

    // DTO sınıfı: Appointment + Zamanları birlikte taşımak için
    public static class AppointmentWithTimesRequest {
        private Appointment appointment;
        private List<AppointmentTime> times;

        public Appointment getAppointment() {
            return appointment;
        }

        public void setAppointment(Appointment appointment) {
            this.appointment = appointment;
        }

        public List<AppointmentTime> getTimes() {
            return times;
        }

        public void setTimes(List<AppointmentTime> times) {
            this.times = times;
        }
    }
}
