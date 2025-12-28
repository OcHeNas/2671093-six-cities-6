import { Offer } from './types/offer';

export const formatRating = (rate: number) => `${(rate / 5) * 100}%`;

export const getSortedOffers = (
  offers: Offer[],
  sortType: string
): Offer[] => {
  const sortedOffers = [...offers];

  switch (sortType) {
    case 'Popular':
      return sortedOffers;
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sortedOffers;
  }
};

