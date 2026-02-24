import { render, screen } from '@testing-library/react';
import Nav from '../index';

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

describe('Nav', () => {
  it('renders primary navigation links', () => {
    render(<Nav location={{ pathname: '/' }} />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects/');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog/');
  });
});
