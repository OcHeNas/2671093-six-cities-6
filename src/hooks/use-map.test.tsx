import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { City } from '../types/offer';
import React from 'react';

describe('Hook: useMap', () => {
  const city: City = {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10,
    },
  };

  it('should return null initially', () => {
    const ref = {
      current: null,
    } as React.MutableRefObject<HTMLElement | null>;

    const { result } = renderHook(() =>
      useMap(ref, city, city.location.zoom)
    );

    expect(result.current).toBeNull();
  });
});

