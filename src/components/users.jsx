import React, { useState, useEffect } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UserTable from './usersTable';
import UserId from '../app/userId';
import api from '../api';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import TextField from './texetField';

const Users = () => {
  const params = useParams();
  const { userId } = params;
  const pageSize = 8;

  const [selectedProf, setSelectedProf] = useState();
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const [users, setUsers] = useState([]);
  const [userById, setUserById] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.users.default.getById(userId).then((data) => setUserById(data));
  }, []);

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

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setSearch('');
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  if (users) {
    const filteredUsers = selectedProf ? users.filter((user) => user.profession.name === selectedProf.name) : users;
    let searchingPeople;
    if (search === '') {
      searchingPeople = filteredUsers;
    } else {
      searchingPeople = filteredUsers.filter((n) => n.name.includes(search));
    }
    const count = searchingPeople.length;
    const sortedUsers = _.orderBy(searchingPeople, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf(setCurrentPage(1));
    };

    const badSmile = 'bi bi-emoji-frown';
    const getError = searchingPeople.length === 0 ? 'Мы не нашли подходящих тебе людей, sorry ' : '';

    console.log(searchingPeople);

    if (userId) {
      return <UserId user={userById} />;
    } else {
      return (
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList selectedItem={selectedProf} items={professions} onItemSelect={handleProfessionSelect} />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}

          <div className="d-flex flex-column">
            <SearchStatus length={count} />
            <div>
              <TextField type="text" name="search" value={search} onChange={handleSearch} placeholder="Search..." />
              <p className="form-text d-inline">{getError}</p>
              <i className={badSmile}></i>
            </div>
            {count > 0 && (
              <UserTable
                users={userCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
              />
            )}

            <div className="d-flex justify-content-center">
              <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      );
    }
  }
  return 'Loading';
};

Users.propTypes = {
  users: PropTypes.array,
  match: PropTypes.object
};

export default Users;
