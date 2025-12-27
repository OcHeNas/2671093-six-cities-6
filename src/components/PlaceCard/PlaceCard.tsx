import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';

type PlaceCardProps = {
  offer: Offer;
  onHover?: (id: string | null) => void;
};

function PlaceCard({ offer, onHover }: PlaceCardProps): JSX.Element {
  const handleMouseEnter = () => onHover?.(offer.id);
  const handleMouseLeave = () => onHover?.(null);

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>

        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

