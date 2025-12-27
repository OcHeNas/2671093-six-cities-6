import { Offer } from '../../types/offer';
import PlaceCard from '../PlaceCard/PlaceCard';
import { useState } from 'react';

type PlaceListProps = {
  offers: Offer[];
};

function PlaceList({ offers }: PlaceListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onHover={setActiveOfferId}
        />
      ))}
    </div>
  );
}

export default PlaceList;


