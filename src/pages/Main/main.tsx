import { useEffect, useState } from 'react';
import CitiesMap from '../../components/CitiesMap/CitiesMap';
import PlaceList from '../../components/PlaceList/PlaceList';
import CitiesList from '../../components/CitiesList/CitiesList';
import SortingBlock from '../../components/SortingBlock/SortingBlock';
import { Cities } from '../../const';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';

function Main(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);
  const selectedPoint = useAppSelector((state) => state.selectedPoint);

  const [currentCityOffers, setCurrentCityOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const filteredOffers = offers.filter(
      (offer) => offer.city.name === city
    );
    setCurrentCityOffers(filteredOffers);
  }, [city, offers]);

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities} />
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {`${currentCityOffers.length} places to stay in ${city}`}
              </b>

              <SortingBlock />

              <PlaceList offers={currentCityOffers} />
            </section>

            <div className="cities__right-section">
              {currentCityOffers.length > 0 && (
                <CitiesMap
                  city={currentCityOffers[0].city}
                  points={currentCityOffers}
                  activeOfferId={selectedPoint?.title ?? undefined}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;


