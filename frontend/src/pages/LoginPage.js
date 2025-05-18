import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));

        if (data.role === 'STUDENT') {
          history.push('/student');
        } else if (data.role === 'OFFICER') {
          history.push('/officer');
        }
      } else {
        const errorText = await response.text();
        alert('Giriş başarısız: ' + errorText);
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Giriş Yap</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      <p className="register-text">
        Hesabın yok mu? <span onClick={() => history.push('/register')}>Kayıt Ol</span>
      </p>
    </div>
  );
}

export default LoginPage;
