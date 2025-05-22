import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './UserList.css';

function UserList() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'OFFICER') {
    history.push('/login');
    } else {
      fetchUsers();
    }
  }, [user, history]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users'); // API adresin farklıysa güncelle
      const data = await response.json();
      // Sadece student rolünde olanları filtrele
      const onlyStudents = data.filter(u => u.role === 'STUDENT');
      setUsers(onlyStudents);
    } catch (error) {
      console.error('Kullanıcılar alınamadı:', error);
    }
  };

  return (
    <div className="user-list">
      <h2>Kullanıcı Listesi</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Ad</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">Kullanıcı bulunamadı.</td>
            </tr>
          ) : (
            users.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role || 'Bilinmiyor'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
       <button className='back' onClick={() => history.push('/officer')}>Geri Dön</button>
    </div>
  );
}

export default UserList;
