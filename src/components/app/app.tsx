import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Main from '../../pages/Main/main';
import Login from '../../pages/Login/login';
import Favorites from '../../pages/Favorites/favorites';
import Offer from '../../pages/Offer/offer';
import NotFound from '../../pages/NotFound/not-found';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction, checkAuthAction } from '../../store/api-actions';
import Spinner from '../spinner/spinner';
import { AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.isOffersLoading);
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (isLoading || authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<Offer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;


