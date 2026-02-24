import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from '../Alert';

jest.mock('../../../public/assets', () => ({
  Icon: ({ onClick }) => <button aria-label="close" onClick={onClick} type="button" />,
}));

describe('Alert', () => {
  it('renders content', () => {
    render(<Alert color="#fff">Alert content</Alert>);

    expect(screen.getByText('Alert content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
  });

  it('calls onClose when close icon is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Alert color="#fff" onClose={onClose}>
        Alert content
      </Alert>
    );

    await user.click(screen.getByRole('button', { name: 'close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
