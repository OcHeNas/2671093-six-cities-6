import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType } from '../../store/action';

const SORT_TYPES = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

function SortingBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedSortType = useAppSelector(
    (state) => state.selectedSortType
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleSortTypeClick = (sortType: string) => {
    dispatch(setSortType(sortType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {SORT_TYPES.map((type) => (
          <li
            key={type}
            className={`places__option ${
              selectedSortType === type ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortTypeClick(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingBlock;
