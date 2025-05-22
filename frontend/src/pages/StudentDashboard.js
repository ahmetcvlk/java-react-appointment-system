import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './StudentDashboard.css';

function StudentDashboard() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  // Kullanıcı yoksa login sayfasına yönlendir
  useEffect(() => {
    if (!user || user.role !== 'STUDENT') {
    history.push('/login');
     }
  }, [user, history]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId'); // userId varsa onu da temizle
    history.push('/login');
  };

  return (
    <div className="student-dashboard">
      <h1>Hoş geldin, {user?.name || 'Öğrenci'}!</h1>

      <div className="dashboard-buttons">
        <button onClick={() => history.push('/appointment')}>Randevu Al</button>
        <button onClick={() => history.push('/student-appointments')}>
          Randevularımı Görüntüle
        </button>
        <button onClick={handleLogout}>Çıkış Yap</button>
      </div>
    </div>
  );
}

export default StudentDashboard;
