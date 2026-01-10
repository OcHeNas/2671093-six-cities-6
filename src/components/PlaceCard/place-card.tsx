import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { formatRating } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedPoint } from '../../store/action';
import { toggleFavoriteAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { useCallback } from 'react';

type PlaceCardProps = {
  cardInfo: Offer;
  typeClassName: string;
};

function PlaceCard({ cardInfo, typeClassName }: PlaceCardProps): JSX.Element {
  const { id, title, type, price, isFavorite, isPremium, rating, previewImage } =
    cardInfo;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  const handleMouseOver = useCallback(
    () => dispatch(setSelectedPoint({ title })),
    [dispatch, title]
  );

  const handleMouseLeave = useCallback(
    () => dispatch(setSelectedPoint(null)),
    [dispatch]
  );

  const handleFavoriteClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(
      toggleFavoriteAction({
        offerId: id,
        status: isFavorite ? 0 : 1,
      })
    );
  };

  return (
    <article
      className={`${typeClassName} place-card`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">
              &#47;&nbsp;night
            </span>
          </div>

          <button
            className={`place-card__bookmark-button button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: formatRating(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;


