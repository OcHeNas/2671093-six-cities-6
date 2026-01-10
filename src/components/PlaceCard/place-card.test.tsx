import { renderWithProviders } from '../../utils/test-utils';
import PlaceCard from './place-card';
import { mockOffer } from '../../mocks/offers';
import { CardType } from '../../const';

it('renders place card', () => {
  const { getByText } = renderWithProviders(
    <PlaceCard cardInfo={mockOffer} typeClassName={CardType.regular} />
  );
  expect(getByText(mockOffer.title)).toBeInTheDocument();
});
