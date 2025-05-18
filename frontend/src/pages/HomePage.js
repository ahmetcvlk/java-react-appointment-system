import React from 'react';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const history = useHistory();

  return (
    <div className="home-container">
      <h1 className="home-title">Fitness Randevu Sistemi</h1>
      <div className="button-group">
        <button className="home-button" onClick={() => history.push('/login')}>Giriş Yap</button>
        <button className="home-button" onClick={() => history.push('/register')}>Kayıt Ol</button>
      </div>
    </div>
  );
}

export default HomePage;
