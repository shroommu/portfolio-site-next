import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

jest.mock('../../features/home/Greeting', () => () => <div>Greeting section</div>);

describe('Home page', () => {
  it('renders greeting section', () => {
    render(<Home />);

    expect(screen.getByText('Greeting section')).toBeInTheDocument();
  });
});
