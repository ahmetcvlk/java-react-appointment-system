package com.fitness.randevu.controller;

import com.fitness.randevu.entity.Appointment;
import com.fitness.randevu.entity.AppointmentTime;
import com.fitness.randevu.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(
        origins = "http://localhost:3000",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        allowedHeaders = "*"
)
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Tüm randevuları getir
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    //Belirli kullanıcının randevuları
    @GetMapping("/user/{userId}")
    public List<Appointment> getAppointmentsByUser(@PathVariable Long userId) {
        return appointmentService.getAppointmentsByUserId(userId);
    }

    // Randevuyu onayla
    @PutMapping("/{id}/approve")
    public ResponseEntity<String> approveAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }
        appointment.setApproved(true);
        appointmentService.saveAppointment(appointment);
        return ResponseEntity.ok("Randevu onaylandı.");
    }


    //Yeni randevu
    @PostMapping("/create")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointmentWithTimes(appointment);
    }




}
