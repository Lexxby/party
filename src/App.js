import React, { useState } from 'react';
import UserBookmark from './components/bookmarkStatus';
import SearchStatus from './components/searchStatus';
import Qualite from './components/qualite';
import Api from './API';

const App = () => {
  const [users, setUsers] = useState(Api.users.fetchAll());

  const handleBookmark = (id) => {
    let newCounters = [...users];
    for (let i = 0; i < newCounters.length; i++) {
      if (newCounters[i]._id === id) {
        if (!newCounters[i].forward) {
          newCounters[i].forward = true;
        } else {
          newCounters[i].forward = false;
        }
      }
    }
    setUsers(newCounters);
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((users) => users._id !== userId));
  };

  const rowUserInfo = users.map((user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{Qualite(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} / 5</td>
        <td>
          <button className={UserBookmark(user.forward)} onClick={() => handleBookmark(user._id)}></button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
            delete
          </button>
        </td>
      </tr>
    );
  });

  if (users.length === 0) return <button className="btn btn-warning text-dark">Сегодня с тобой никто не тусанет</button>;

  return (
    <>
      <span className="badge bg-primary">{SearchStatus(users.length)}</span>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{rowUserInfo}</tbody>
      </table>
    </>
  );
};
export default App;
