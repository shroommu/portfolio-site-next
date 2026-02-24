import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

describe('Footer', () => {
  it('renders site name link and copyright', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Alex Kruckenberg' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Copyright 2025')).toBeInTheDocument();
  });
});
