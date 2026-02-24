import { render, screen } from '@testing-library/react';
import Footer, { WebsiteName } from '../Footer';

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

describe('Footer', () => {
  it('renders site name link and copyright', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Alex Kruckenberg' })).toHaveAttribute('href', '/');
    expect(screen.getByText(`Copyright ${currentYear}`)).toBeInTheDocument();
  });

  it('renders WebsiteName export', () => {
    render(<WebsiteName>Site Name</WebsiteName>);

    expect(screen.getByText('Site Name')).toBeInTheDocument();
  });
});
