import { render, screen } from '@testing-library/react';
import Greeting from '../../../features/home/Greeting';

jest.mock('next/image', () => {
  return ({ alt }) => <img alt={alt} />;
});

describe('Greeting', () => {
  it('renders greeting content and profile image', () => {
    render(<Greeting />);

    expect(screen.getByRole('heading', { name: "Hi, I'm Alex!" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Software Developer/i })).toBeInTheDocument();
    expect(screen.getByAltText('a picture of the author')).toBeInTheDocument();
    expect(screen.getByText('Thanks for visiting my site!')).toBeInTheDocument();
  });
});
