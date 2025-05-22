import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './StudentAppointments.css';

function StudentAppointments() {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!user || user.role !== 'STUDENT') {
      history.push('/login');
    }
    else{

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/appointments/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          alert("Randevular alınamadı.");
        }
      } catch (error) {
        console.error("Hata:", error);
        alert("Sunucuya bağlanırken hata oluştu.");
      }
    };
  

    fetchAppointments();
  }
  }, [userId, history]);

  return (
    <div className="student-appointments">
      <h2>Randevularım</h2>
      {appointments.length === 0 ? (
        <p>Henüz bir randevunuz yok.</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <p><strong>Randevu Durumu:</strong> {appointment.approved ? 'Onaylandı ✅' : 'Beklemede ⏳'}</p>
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
            </li>
          ))}
        </ul>

      )}
      <button onClick={() => history.push('/student')}>Geri Dön</button>
    </div>
  );
}

export default StudentAppointments;
