import { render, screen } from '@testing-library/react';
import Home from '../index';

jest.mock('../home/Greeting', () => () => <div>Greeting section</div>);

describe('Home page', () => {
  it('renders greeting section', () => {
    render(<Home />);

    expect(screen.getByText('Greeting section')).toBeInTheDocument();
  });
});
