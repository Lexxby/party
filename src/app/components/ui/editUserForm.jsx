import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import PropTypes from 'prop-types';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import { useHistory } from 'react-router-dom';

const EditUserPage = () => {
  const [data] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const history = useHistory();
  const [user, setUser] = useState({});
  const getUserById = history.location.pathname.split('/')[2];
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  useEffect(() => {
    api.users.getById(getUserById).then((data) => setUser(data));
  }, []);

  const handleChange = (target) => {
    console.log('target', target);
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  // function optionsArray1(user) {
  //   if (Array.isArray(user) && typeof user === 'object') {
  //     return Object.keys(user).map((optionName) => ({
  //       label: user[optionName].name,
  //       value: user[optionName]._id
  //     }));
  //   } else {
  //     return user;
  //   }
  // }

  function test(user) {
    user.value = user._id;
    user.label = user.name;
    delete user._id;
    delete user.name;
  }
  test(user.qualities);

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  if (user) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField label="Имя" type="text" name="text" value={user.name} onChange={handleChange} error={errors.password} />
              <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />

              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={user.profession}
                error={errors.profession}
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
              <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

EditUserPage.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  error: PropTypes.string
};

export default EditUserPage;
