import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

const mockMenu = jest.fn();

jest.mock('next/link', () => {
  return ({ href, children, onClick }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
});

jest.mock('../../Nav/index.js', () => () => <div>Nav</div>);

jest.mock('../../Nav/Menu', () => {
  return (props) => {
    mockMenu(props);
    return (
      <div>
        <span>{props.show ? 'menu-open' : 'menu-closed'}</span>
        <button type="button" onClick={props.onNavigate}>
          Navigate
        </button>
      </div>
    );
  };
});

jest.mock('../../../../public/assets/index.js', () => ({
  Icon: (props) => <img alt={props.alt || 'social icon'} src={props.src} />,
}));

jest.mock('react-icons/md', () => ({
  MdMenu: () => <span>open-icon</span>,
  MdClose: () => <span>close-icon</span>,
}));

describe('Header', () => {
  it('renders core navigation and social links', () => {
    render(<Header location={{ pathname: '/' }} />);

    expect(screen.getByRole('link', { name: 'Alex Kruckenberg' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact/');
    expect(screen.getByRole('link', { name: 'instagram icon' })).toHaveAttribute('href', 'https://instagram.com/shroommu');
    expect(screen.getByRole('link', { name: 'github icon' })).toHaveAttribute('href', 'https://github.com/shroommu');
    expect(screen.getByRole('link', { name: 'linkedin icon' })).toHaveAttribute('href', 'https://linkedin.com/in/alex-kruckenberg');
  });

  it('toggles mobile menu visibility', async () => {
    const user = userEvent.setup();
    const { container } = render(<Header location={{ pathname: '/' }} />);
    const getMenuToggle = () => container.querySelector('button[aria-controls="mobile-site-menu"]');

    expect(screen.getByText('menu-closed')).toBeInTheDocument();

    await user.click(getMenuToggle());

    expect(screen.getByText('menu-open')).toBeInTheDocument();
    const lastCall = mockMenu.mock.calls[mockMenu.mock.calls.length - 1];
    expect(lastCall[0]).toEqual(
      expect.objectContaining({
        show: true,
      })
    );

    await user.click(getMenuToggle());
    expect(screen.getByText('menu-closed')).toBeInTheDocument();

    await user.click(getMenuToggle());
    await user.click(screen.getByRole('button', { name: 'Navigate' }));
    expect(screen.getByText('menu-closed')).toBeInTheDocument();
  });
});
