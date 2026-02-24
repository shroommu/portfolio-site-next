import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../Menu';

jest.mock('next/link', () => {
  return ({ href, onClick, children }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
});

describe('Menu', () => {
  it('renders all mobile nav items', () => {
    render(<Menu show onNavigate={() => {}} />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects/');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog/');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact/');
  });

  it('calls onNavigate when a nav item is clicked', async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();

    render(<Menu show onNavigate={onNavigate} />);

    await user.click(screen.getByRole('link', { name: 'Home' }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('moves off-screen when show is false', () => {
    const { container } = render(<Menu show={false} onNavigate={() => {}} />);

    expect(container.firstChild).toHaveStyle('top: -50%');
  });
});
