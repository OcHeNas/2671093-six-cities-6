import { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/Header/header';
import ReviewsList from '../../components/ReviewsList/reviews-list';
import CitiesMap from '../../components/CitiesMap/cities-map';
import NearestCardList from '../../components/NearestCardList/nearest-card-list';
import CommentForm from '../../components/CommentForm/comment-form';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
} from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { OfferDetails } from '../../types/offer';
import { toggleFavoriteAction } from '../../store/api-actions';

const OfferTypeMap: Record<string, string> = {
  apartment: 'Apartment',
  room: 'Room',
  house: 'House',
  hotel: 'Hotel',
};

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  if (!('bedrooms' in offer)) {
    return <Navigate to="/404" />;
  }

  const offerDetails: OfferDetails = offer;
  const nearbyThreeOffers = nearbyOffers.slice(0, 3);
  const mapOffers = [offerDetails, ...nearbyThreeOffers];

  const bedroomsText =
    offerDetails.bedrooms === 1
      ? '1 Bedroom'
      : `${offerDetails.bedrooms} Bedrooms`;

  const adultsText =
    offerDetails.maxAdults === 1
      ? 'Max 1 adult'
      : `Max ${offerDetails.maxAdults} adults`;

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(
      toggleFavoriteAction({
        offerId: offerDetails.id,
        status: offerDetails.isFavorite ? 0 : 1,
      })
    );
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__container container">
            <div className="offer__wrapper">

              {/* Premium badge */}
              {offerDetails.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              {/* Gallery */}
              <div className="offer__gallery">
                {offerDetails.images.slice(0, 6).map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img
                      className="offer__image"
                      src={image}
                      alt="Offer"
                    />
                  </div>
                ))}
              </div>

              <h1 className="offer__name">{offerDetails.title}</h1>

              {/* Favorite button */}
              <button
                className={`offer__bookmark-button button ${
                  offerDetails.isFavorite ? 'offer__bookmark-button--active' : ''
                }`}
                type="button"
                onClick={handleFavoriteClick}
              >
                <svg
                  className="offer__bookmark-icon"
                  width={31}
                  height={33}
                >
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{
                      width: `${Math.round(offerDetails.rating) / 5 * 100}%`,
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
                  {OfferTypeMap[offerDetails.type]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedroomsText}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {adultsText}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">
                  &euro;{offerDetails.price}
                </b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              {/* Goods */}
              <div className="offer__inside">
                <h2 className="offer__inside-title">
                  What&apos;s inside
                </h2>
                <ul className="offer__inside-list">
                  {offerDetails.goods.map((good) => (
                    <li
                      className="offer__inside-item"
                      key={good}
                    >
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Host */}
              <div className="offer__host">
                <h2 className="offer__host-title">
                  Meet the host
                </h2>

                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      offerDetails.host.isPro
                        ? 'offer__avatar-wrapper--pro'
                        : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offerDetails.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>

                  <span className="offer__user-name">
                    {offerDetails.host.name}
                  </span>

                  {offerDetails.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>

                <div className="offer__description">
                  <p className="offer__text">
                    {offerDetails.description}
                  </p>
                </div>
              </div>

              {/* Reviews */}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews{' '}
                  <span className="reviews__amount">
                    {comments.length}
                  </span>
                </h2>

                <ReviewsList reviews={comments} />

                {authorizationStatus === AuthorizationStatus.Auth && id && (
                  <CommentForm offerId={id} />
                )}
              </section>
            </div>
          </div>

          <CitiesMap
            city={offerDetails.city}
            points={mapOffers}
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


