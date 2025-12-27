import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../../pages/Main/main';
import Login from '../../pages/Login/login';
import Favorites from '../../pages/Favorites/favorites';
import Offer from '../../pages/Offer/offer';
import NotFound from '../../pages/NotFound/not-found';
import PrivateRoute from '../private-route/private-route';

import { Offer as OfferType } from '../../types/offer';

type AppProps = {
  offers: OfferType[];
};

function App({ offers }: AppProps): JSX.Element {
  const isAuth = false;

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main offers={offers} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Favorites offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<Offer offers={offers} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
