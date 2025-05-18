package com.fitness.randevu.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="appointments")

public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Randevuyu alan kullanıcı
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Onaylanmış mı?
    private boolean approved = false;

    // Randevuya bağlı birden fazla gün-saat olabilir
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AppointmentTime> times = new ArrayList<>();

    // Getter ve Setter'lar

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public List<AppointmentTime> getTimes() {
        return times;
    }

    public void setTimes(List<AppointmentTime> times) {
        this.times = times;
    }
}

