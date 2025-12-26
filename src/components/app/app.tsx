import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../../pages/Main/main';
import Login from '../../pages/Login/login';
import Favorites from '../../pages/Favorites/favorites';
import Offer from '../../pages/Offer/offer';
import NotFound from '../../pages/NotFound/not-found';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
};

function App({ offersCount }: AppProps): JSX.Element {
  const isAuth = false; // пользователь всегда не авторизован

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main offersCount={offersCount} />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route path="/offer/:id" element={<Offer />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

