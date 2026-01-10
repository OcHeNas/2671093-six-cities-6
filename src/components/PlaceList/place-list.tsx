import PlaceCard from '../PlaceCard/place-card';
import { CardListProps } from '../../types/card-list';
import { CardType } from '../../const';
import { getSortedOffers } from '../../utils';
import { useAppSelector } from '../../hooks';
import { useMemo } from 'react';

export function PlaceList({ offers }: CardListProps) {
  const selectedSortType: string = useAppSelector((state) => state.selectedSortType);

  const sortedOffers = useMemo(() => getSortedOffers(offers, selectedSortType), [offers, selectedSortType]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <PlaceCard key={offer.id} cardInfo={offer} typeClassName={CardType.regular} />
      ))}
    </div>
  );
}

export default PlaceList;


