import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';

type City = {
  id: number;
  name: string;
};

type CitiesListProps = {
  cities: City[];
};

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city.id}
          className="locations__item"
          onClick={() => dispatch(changeCity(city.name))}
        >
          <a
            className={`locations__item-link tabs__item ${
              city.name === currentCity ? 'tabs__item--active' : ''
            }`}
            href="#"
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
