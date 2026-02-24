import { render, screen } from '@testing-library/react';
import Gallery from '../Gallery';

jest.mock('../shared', () => ({
  ComingSoon: () => <div>Coming soon</div>,
}));

describe('Gallery', () => {
  it('renders coming soon content', () => {
    render(<Gallery />);

    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });
});
