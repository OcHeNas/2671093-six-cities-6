import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
} from '../../store/api-actions';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import CommentForm from '../../components/CommentForm/CommentForm';
import CitiesMap from '../../components/CitiesMap/CitiesMap';
import NearestCardList from '../../components/NearestCardList/NearestCardList';
import Spinner from '../../components/spinner/spinner';
import { AuthorizationStatus } from '../../const';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const offer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const comments = useAppSelector((state) => state.comments);
  const isLoading = useAppSelector((state) => state.isOfferLoading);
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery">
            <img src={offer.previewImage} alt={offer.title} />
          </div>

          <div className="offer__container container">
            <h1>{offer.title}</h1>

            <section className="offer__reviews reviews">
              <h2>
                Reviews · <span>{comments.length}</span>
              </h2>

              <ReviewsList reviews={comments} />

              {authStatus === AuthorizationStatus.Auth && (
                <CommentForm offerId={offer.id} />
              )}
            </section>
          </div>

          <section className="offer__map map">
            <CitiesMap city={offer.city} points={nearbyOffers} />
          </section>
        </section>

        <section className="near-places places">
          <NearestCardList offers={nearbyOffers} />
        </section>
      </main>
    </div>
  );
}

export default Offer;


