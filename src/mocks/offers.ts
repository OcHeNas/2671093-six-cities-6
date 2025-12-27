import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Cozy apartment in the city center',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.889,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.374,
      longitude: 4.889,
      zoom: 10,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.6,
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '2',
    title: 'Modern studio near park',
    type: 'studio',
    price: 90,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.36,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.36,
      longitude: 4.9,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '3',
    title: 'Spacious room with balcony',
    type: 'room',
    price: 70,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.38,
        longitude: 4.88,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.38,
      longitude: 4.88,
      zoom: 10,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
    previewImage: 'img/room.jpg',
  },
  {
    id: '4',
    title: 'Luxury penthouse with view',
    type: 'apartment',
    price: 300,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37,
        longitude: 4.87,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.37,
      longitude: 4.87,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    previewImage: 'img/apartment-03.jpg',
  },
];
