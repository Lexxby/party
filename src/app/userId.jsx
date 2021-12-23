import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from '../components/qualitie';
import { Link } from 'react-router-dom';

const UsersId = ({ user }) => {
  console.log(user);

  if (user) {
    return (
      <>
        {console.log(user)}
        <h1>{user.name} </h1>
        <h2>Профессия: {user.profession.name}</h2>
        <p>
          {user.qualities.map((qual) => (
            <Qualitie {...qual} key={qual._id} />
          ))}
        </p>
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>

        <Link to="/users" className="btn btn-primary mt-5">
          Все пользователи
        </Link>
      </>
    );
  } else {
    return <h1>Loading ...</h1>;
  }
};

UsersId.propTypes = {
  user: PropTypes.string
};

export default UsersId;
