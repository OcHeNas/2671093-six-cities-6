import Header from '../../components/Header/Header';
import { useAppSelector } from '../../hooks';
import FavouritesCityBlock from '../../components/FavouritesCityBlock/FavouritesCityBlock';

function Favorites(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <p className="favorites__status">Nothing yet saved</p>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </section>
          </div>
        </main>
      </div>
    );
  }

  const groupedByCity = favorites.reduce<Record<string, typeof favorites>>(
    (acc, offer) => {
      const city = offer.city.name;
      acc[city] = acc[city] || [];
      acc[city].push(offer);
      return acc;
    },
    {}
  );

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {Object.entries(groupedByCity).map(([city, offers]) => (
                <FavouritesCityBlock
                  key={city}
                  city={city}
                  places={offers}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Favorites;


