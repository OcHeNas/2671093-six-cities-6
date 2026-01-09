import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/Header/Header';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import CitiesMap from '../../components/CitiesMap/CitiesMap';
import NearestCardList from '../../components/NearestCardList/NearestCardList';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
} from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { OfferDetails } from '../../types/offer';

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const offer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const comments = useAppSelector((state) => state.comments);
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id]);

  if (!offer) {
    return <Navigate to="/404" />;
  }

  // ✅ Сужение типа
  if (!('bedrooms' in offer)) {
    return <Navigate to="/404" />;
  }

  // ✅ Явно используем OfferDetails
  const offerDetails: OfferDetails = offer;

  const nearbyThreeOffers = nearbyOffers.slice(0, 3);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__container container">
            <div className="offer__wrapper">
              <h1 className="offer__name">{offerDetails.title}</h1>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{
                      width: `${(offerDetails.rating / 5) * 100}%`,
                    }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offerDetails.rating}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerDetails.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerDetails.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerDetails.maxAdults} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">
                  &euro;{offerDetails.price}
                </b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews{' '}
                  <span className="reviews__amount">
                    {comments.length}
                  </span>
                </h2>

                <ReviewsList reviews={comments} />

                {authorizationStatus === AuthorizationStatus.Auth && (
                  <form className="reviews__form form">
                    {/* форма отзыва */}
                  </form>
                )}
              </section>
            </div>
          </div>

          <CitiesMap
            city={offerDetails.city}
            points={nearbyThreeOffers}
            activeOfferId={offerDetails.id}
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearestCardList offers={nearbyThreeOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;


