import PlaceCard from '../PlaceCard/PlaceCard';
import { CardListProps } from '../../types/card-list';
import { CardType } from '../../const';
import { getSortedOffers } from '../../utils';
import { useAppSelector } from '../../hooks';

function PlaceList({ offers }: CardListProps): JSX.Element {
  const selectedSortType: string = useAppSelector(
    (state) => state.selectedSortType
  );
  return (
    <div className="cities__places-list places__list tabs__content">
      {getSortedOffers(offers, selectedSortType).map((offer) => (
        <PlaceCard
          key={offer.id}
          cardInfo={offer}
          typeClassName={CardType.regular}
        />
      ))}
    </div>
  );
}

export default PlaceList;


