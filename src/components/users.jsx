import React, { useState } from 'react';
import Api from '../API';

const Users = () => {
  const [users, setUsers] = useState(Api.users.fetchAll());

  const renderPhrase = (number) => {
    if ((number % 10 === 2 || number % 10 === 3 || number % 10 === 4) && (number < 10 || number > 20)) {
      return 'человека';
    } else {
      return 'человек';
    }
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((users) => users._id !== userId));
  };
  const rowUserInfo = users.map((user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((a) => {
            const colorName = `btn btn-${a.color} m-2`;
            return <button className={colorName}>{a.name}</button>;
          })}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} / 5</td>
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
      <button className="btn btn-primary">
        {users.length} {renderPhrase(users.length)} тусанет с тобой сегодня
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{rowUserInfo}</tbody>
      </table>
    </>
  );
};

export default Users;
