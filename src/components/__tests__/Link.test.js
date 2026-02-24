import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from '../Link';

describe('Link', () => {
  it('renders an external anchor with children', () => {
    render(<Link href="https://example.com">Visit</Link>);

    const anchor = screen.getByRole('link', { name: 'Visit' });
    expect(anchor).toHaveAttribute('href', 'https://example.com');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noreferrer');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <Link href="https://example.com" onClick={onClick}>
        Visit
      </Link>
    );

    await user.click(screen.getByRole('link', { name: 'Visit' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
