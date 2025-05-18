import React, { useState, useEffect } from 'react';

const hours = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

function AppointmentSelector({ onSelectionConfirm }) {
  const [days, setDays] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // 7 günlük günleri oluştur
  useEffect(() => {
    const today = new Date();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(today.getDate() + i);
      next7Days.push(day);
    }

    setDays(next7Days);
  }, []);

  const toggleSlot = (day, hour) => {
    const key = `${day.toDateString()} ${hour}`;

    if (selectedSlots.includes(key)) {
      setSelectedSlots(selectedSlots.filter(slot => slot !== key));
    } else {
      setSelectedSlots([...selectedSlots, key]);
    }
  };

  const handleConfirm = () => {
    // Seçilen slotları üst bileşene gönder
    onSelectionConfirm(selectedSlots);
  };

  return (
    <div>
      <h2>Randevu Seçimi</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {days.map((day, index) => (
          <div key={index}>
            <h4>{day.toLocaleDateString('tr-TR', { weekday: 'long', month: 'numeric', day: 'numeric' })}</h4>
            {hours.map((hour, idx) => {
              const key = `${day.toDateString()} ${hour}`;
              const isSelected = selectedSlots.includes(key);

              return (
                <div
                  key={idx}
                  onClick={() => toggleSlot(day, hour)}
                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    marginBottom: '5px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#4caf50' : '#f0f0f0',
                    color: isSelected ? 'white' : 'black',
                    textAlign: 'center',
                    borderRadius: '4px',
                  }}
                >
                  {hour}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button onClick={handleConfirm} style={{ marginTop: '20px' }}>
        Randevuyu Onayla
      </button>
    </div>
  );
}

export default AppointmentSelector;
