import CitiesMap from '../../components/CitiesMap/cities-map';
import PlaceList from '../../components/PlaceList/place-list';
import CitiesList from '../../components/CitiesList/cities-list';
import SortingBlock from '../../components/SortingBlock/sorting-block';
import MainEmpty from '../../components/MainEmpty/main-empty';
import { Cities } from '../../const';
import { useAppSelector } from '../../hooks';
import {
  selectCurrentCityOffers,
  selectCity,
  selectSelectedPoint,
} from '../../store/selectors';

function Main(): JSX.Element {
  const city = useAppSelector(selectCity);
  const selectedPoint = useAppSelector(selectSelectedPoint);
  const currentCityOffers = useAppSelector(selectCurrentCityOffers);

  if (currentCityOffers.length === 0) {
    return (
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <section className="locations container">
            <CitiesList cities={Cities} />
          </section>
          <MainEmpty />
        </main>
      </div>
    );
  }

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
              <b className="places__found">
                {`${currentCityOffers.length} places to stay in ${city}`}
              </b>

              <SortingBlock />
              <PlaceList offers={currentCityOffers} />
            </section>

            <div className="cities__right-section">
              <CitiesMap
                city={currentCityOffers[0].city}
                points={currentCityOffers}
                activeOfferId={selectedPoint?.title}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;


