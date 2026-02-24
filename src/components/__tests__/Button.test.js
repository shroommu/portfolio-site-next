import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button, { themes } from '../Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when enabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Submit</Button>);

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <Button onClick={onClick} disabled theme={themes.tertiary}>
        Submit
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Submit' });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
