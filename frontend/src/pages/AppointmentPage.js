import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // ⬅️ Yönlendirme için ekledik
import './AppointmentPage.css';

const HOURS = ['09:00', '10:00', '11:00', '13:00', '14:00'];

function AppointmentPage() {
  const [weekDates, setWeekDates] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!user || user.role !== 'STUDENT') {
    history.push('/login');
    }



    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      days.push(newDate);
    }
    setWeekDates(days);
  }, [history]);

  const toggleSlot = (day, hour) => {
    const dateStr = day.toISOString().split('T')[0];
    const slot = { date: dateStr, time: hour };

    const exists = selectedSlots.some(s => s.date === slot.date && s.time === slot.time);
    if (exists) {
      setSelectedSlots(selectedSlots.filter(s => !(s.date === slot.date && s.time === slot.time)));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleConfirm = async () => {
    if (selectedSlots.length === 0) {
      alert("Lütfen en az bir randevu saati seçin.");
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Kullanıcı oturumu bulunamadı, lütfen tekrar giriş yapın.");
      history.push('/login');
      return;
    }

    // JSON yapısını backend'e uygun hale getiriyoruz
    const requestBody = {
      user: {
        id: parseInt(userId)  // Şimdilik sabit kullanıcı ID
      },
      approved: false,
      times: selectedSlots
    };

    try {
      const response = await fetch("http://localhost:8080/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        alert("Randevular başarıyla kaydedildi!");
        setSelectedSlots([]);
      } else {
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanırken hata oluştu.");
    }
  };

  const isSelected = (dateStr, hour) => {
    return selectedSlots.some(s => s.date === dateStr && s.time === hour);
  };

  return (
    <div className="calendar-container">
      <h2>Randevu Al</h2>
      <div className="calendar-grid">
        {weekDates.map((day, index) => {
          const dateStr = day.toISOString().split('T')[0];
          return (
            <div key={index} className="calendar-column">
              <div className="calendar-date">
                {day.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}
              </div>
              {HOURS.map((hour) => (
                <button
                  key={hour}
                  className={`time-slot ${isSelected(dateStr, hour) ? 'selected' : ''}`}
                  onClick={() => toggleSlot(day, hour)}
                >
                  {hour}
                </button>
              ))}
            </div>
          );
        })}
      </div>
      
      <button className="confirm-button" onClick={handleConfirm}>
        Randevuyu Onayla
      </button>
      <button className='back' onClick={() => history.push('/student')}>Geri Dön</button>

    </div>
  );
}

export default AppointmentPage;
