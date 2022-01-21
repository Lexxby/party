import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
// import PropTypes from 'prop-types';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import { useRouteMatch, useHistory } from 'react-router-dom';

const EditUserPage = () => {
  const match = useRouteMatch();
  const [user, setUser] = useState();
  const userId = match.params.userId;
  const history = useHistory();
  const handleUsersRoute = () => {
    history.push(`/users/${userId}`);
  };
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Имя обязателено для заполнения'
      }
    },
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [user]);
  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    if (target.name === 'profession') {
      const convProf = Object.values(professions).filter((e) => e._id === target.value)[0];
      setUser((prevState) => ({ ...prevState, profession: convProf }));
    } else if (target.name === 'qualities') {
      const convQual = target.value.map((data) => ({
        _id: data.value,
        name: data.label,
        color: data.color
      }));
      setUser((prevState) => ({ ...prevState, qualities: convQual }));
    } else if (target) {
      setUser((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    api.users.update(userId, user);
    handleUsersRoute();
  };

  if (user) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField label="Имя" name="name" value={user.name} onChange={handleChange} error={errors.name} />
              <TextField label="Электронная почта" name="email" value={user.email} onChange={handleChange} error={errors.email} />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={user.profession._id}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={user.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={user.qualities}
                name="qualities"
                label="Выберите ваши качества"
              />

              <button className="btn btn-primary mx-auto" type="submit" onClick={handleSubmit} disabled={!isValid}>
                Сохранить изменения
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1 className="vstack gap-2 col-md-5 mx-auto mt-5">Loading...</h1>;
  }
};

// EditUserPage.propTypes = {
//   name: PropTypes.string,
//   value: PropTypes.bool,
//   onChange: PropTypes.func,
//   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
// };

export default EditUserPage;
