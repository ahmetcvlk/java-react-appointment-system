import React, { useEffect, useState } from 'react';
import './OfficerAppointments.css';
import { useHistory } from 'react-router-dom';

function OfficerAppointments() {
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
     if (!user || user.role !== 'OFFICER') {
    history.push('/login');
     }

     fetch('http://localhost:8080/api/appointments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Randevular alınamadı');
        }
        return response.json();
      })
      .then(data => {
        setAppointments(data);
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, [history]);

  const approveAppointment = (id) => {
  fetch(`http://localhost:8080/api/appointments/${id}/approve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Onaylama başarısız');
      }
      setAppointments(prev =>
        prev.map(app => app.id === id ? { ...app, approved: true } : app)
      );
    })
    .catch(error => {
      console.error('Onaylama sırasında hata oluştu:', error);
    });
  };

  return (
    <div className="officer-appointments">
      <h1>Tüm Randevular</h1>
      {appointments.length === 0 ? (
        <p>Henüz randevu yok.</p>
      ) : (
        appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h3>Kullanıcı: {appointment.user.name}</h3>
            <p><strong>Randevu Saatleri:</strong></p>
            <ul>
              {appointment.times.map((time) => {
                  const dayName = new Date(time.date).toLocaleDateString('tr-TR', { weekday: 'long' });
                  return (
                    <li key={time.id}>
                      <strong>{time.date}</strong>({dayName}) - {time.time}
                    </li>
                  );
                })}
            </ul>
            {appointment.approved ? (
              <p className="approved-text">✅ Randevu onaylandı</p>
            ) : (
              <button
                className="approve-button"
                onClick={() => approveAppointment(appointment.id)}
              >
                Onayla
              </button>
            )}
          </div>
        ))
      )}
       <button className='back' onClick={() => history.push('/officer')}>Geri Dön</button>
    </div>
  );
}

export default OfficerAppointments;
