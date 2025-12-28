import PlaceCard from '../PlaceCard/PlaceCard';
import { CardListProps } from '../../types/card-list';
import { CardType } from '../../const';

function NearestCardList({ offers }: CardListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          cardInfo={offer}
          typeClassName={CardType.nearest}
        />
      ))}
    </div>
  );
}

export default NearestCardList;
