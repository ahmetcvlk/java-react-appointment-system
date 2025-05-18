import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      role: 'STUDENT', // Sabit olarak 'student'
    };

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Kayıt başarılı!');
        history.push('/login');
      } else {
        const errorText = await response.text();
        alert('Kayıt başarısız: ' + errorText);
      }
    } catch (error) {
      console.error('Kayıt sırasında hata:', error);
      alert('Bir hata oluştu.');
    }
  };


  return (
    <div className="register-container">
      <h2 className="register-title">Kayıt Ol</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Ad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Kayıt Ol</button>
      </form>
      <p className="login-link">
        Zaten hesabın var mı? <span onClick={() => history.push('/login')}>Giriş Yap</span>
      </p>
    </div>
  );
}

export default RegisterPage;
