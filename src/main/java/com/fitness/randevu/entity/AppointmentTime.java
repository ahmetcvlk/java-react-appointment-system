package com.fitness.randevu.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointment_time")


public class AppointmentTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Randevu günü (örn: 2025-05-10)
    private LocalDate date;

    // Randevu saati (örn: 14:00)
    private LocalTime time;

    // Bu zaman hangi randevuya ait?
    @ManyToOne
    @JoinColumn(name = "appointment_id") // appointment_time tablosunda FK olacak
    private Appointment appointment;

    // --- Constructors ---

    public AppointmentTime() {
    }

    public AppointmentTime(LocalDate date, LocalTime time) {
        this.date = date;
        this.time = time;
    }

    // --- Getters and Setters ---

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

}
