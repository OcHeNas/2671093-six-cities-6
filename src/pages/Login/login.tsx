import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/action';
import { Cities, AuthorizationStatus } from '../../const';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to="/" replace />;
  }

  const isPasswordValid = passwordRegex.test(password);
  const isFormValid = email.length > 0 && isPasswordValid;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!isFormValid) {
      return;
    }

    dispatch(loginAction({ email, password }))
      .unwrap()
      .then(() => navigate('/'));
  };

  const handleRandomCity = () => {
    const randomCity =
      Cities[Math.floor(Math.random() * Cities.length)].name;
    dispatch(changeCity(randomCity));
    navigate('/');
  };

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <form className="login__form form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={!isFormValid}>
            Sign in
          </button>

          <button
            type="button"
            onClick={handleRandomCity}
            style={{ marginTop: '10px' }}
          >
            Random city
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;


