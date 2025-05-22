import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './OfficerDashboard.css';

function OfficerDashboard() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  // Kullanıcı yoksa login sayfasına yönlendir
  useEffect(() => {
    if (!user || user.role !== 'OFFICER') {
    history.push('/login');
     }
  }, [user, history]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId'); // userId varsa onu da temizle
    history.push('/login');
  };

  return (
    <div className="officer-dashboard">
      <h1>Hoş geldin, {user?.name || 'Memur'}!</h1>

      <div className="dashboard-buttons">
        <button onClick={() => history.push('/officer-appointments')}>Randevuları Görüntüle</button>
        <button onClick={() => history.push('/user-list')}>
          Kullanıcı Listesi
        </button>
        <button onClick={() => history.push('/appointment-summary')}>
          Randevu Özeti
        </button>

        <button onClick={handleLogout}>Çıkış Yap</button>
      </div>
    </div>
  );
}

export default OfficerDashboard;
