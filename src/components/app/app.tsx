import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main/main';
import Login from '../../pages/Login/login';
import Favorites from '../../pages/Favorites/favorites';
import Offer from '../../pages/Offer/offer';
import NotFound from '../../pages/NotFound/not-found';
import PrivateRoute from '../private-route/private-route';
import { Review } from '../../types/review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOffersList } from '../../store/action';
import { useEffect } from 'react';

type AppProps = {
  reviews: Review[];
};

function App({ reviews }: AppProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersList);

  useEffect(() => {
    dispatch(setOffersList());
  }, [dispatch]);

  if (offers.length === 0) {
    return null;
  }

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const isAuth = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Favorites offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route
          path="/offer/:id"
          element={<Offer offers={offers} reviews={reviews} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


