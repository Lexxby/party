import React, { useState, useEffect } from 'react';
import Users from './components/users';
import api from './api';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.default.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    const newArray = users.filter((user) => user._id !== userId);
    return setUsers(newArray);
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
  };

  return (
    <div>
      <Users onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} users={users} />
    </div>
  );
}

export default App;
