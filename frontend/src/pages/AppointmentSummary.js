import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AppointmentSummary.css';

function AppointmentSummary() {
  const [groupedSummary, setGroupedSummary] = useState({});
  const history = useHistory();

  const getDayName = (dateString) => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const isPast = (dateStr, timeStr) => {
    const dateTime = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    return dateTime < now;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'OFFICER') {
      history.push('/login');
      return;
    }

    fetch('http://localhost:8080/api/appointments')
      .then(res => res.json())
      .then(data => {
        const summaryMap = {};

        data.forEach(appointment => {
          if (!appointment.approved) return; // ❗ Sadece onaylılar

          const userName = appointment.user?.name || 'Bilinmiyor';

          appointment.times.forEach(time => {
            const { date, time: hour } = time;

            if (!summaryMap[date]) {
              summaryMap[date] = [];
            }

            summaryMap[date].push({
              time: hour,
              user: userName,
              isPast: isPast(date, hour),
            });
          });
        });

        setGroupedSummary(summaryMap);
      })
      .catch(err => console.error('Özet alınamadı:', err));
  }, [history]);

  return (
    <div className="appointment-summary">
      <h2>Randevu Özeti</h2>
      {Object.keys(groupedSummary).length === 0 ? (
        <p>Henüz onaylanmış randevu yok.</p>
      ) : (
        <div className="summary-list">
          {Object.entries(groupedSummary).map(([date, entries]) => (
            <div className="summary-day" key={date}>
              <h3>📅 {getDayName(date)}, {date}</h3>
              <ul>
                {entries.map((entry, index) => (
                  <li key={index}>
                    🕒 {entry.time} - 👤 {entry.user}
                    {entry.isPast ? ' ❗(Geçmiş Randevu)' : ''}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <button className='back' onClick={() => history.push('/officer')}>Geri Dön</button>
    </div>
  );
}

export default AppointmentSummary;
