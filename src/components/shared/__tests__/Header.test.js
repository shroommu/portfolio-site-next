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
  MdMenu: ({ onClick }) => (
    <button aria-label="open menu" onClick={onClick} type="button">
      open
    </button>
  ),
  MdClose: ({ onClick }) => (
    <button aria-label="close menu" onClick={onClick} type="button">
      close
    </button>
  ),
}));

describe('Header', () => {
  it('renders core navigation and social links', () => {
    render(<Header location={{ pathname: '/' }} />);

    expect(screen.getByRole('link', { name: 'Alex Kruckenberg' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact/');
    expect(screen.getByRole('link', { name: 'instagram icon' })).toHaveAttribute('href', 'http://instagram.com/shroommu');
    expect(screen.getByRole('link', { name: 'github icon' })).toHaveAttribute('href', 'http://github.com/shroommu');
    expect(screen.getByRole('link', { name: 'linkedin icon' })).toHaveAttribute('href', 'http://linkedin.com/in/alex-kruckenberg');
  });

  it('toggles mobile menu visibility', async () => {
    const user = userEvent.setup();
    render(<Header location={{ pathname: '/' }} />);

    expect(screen.getByText('menu-closed')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'open menu' }));

    expect(screen.getByText('menu-open')).toBeInTheDocument();
    const lastCall = mockMenu.mock.calls[mockMenu.mock.calls.length - 1];
    expect(lastCall[0]).toEqual(
      expect.objectContaining({
        show: true,
      })
    );
  });
});
