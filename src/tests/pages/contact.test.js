import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../../pages/contact';

jest.mock('../../components/Alert', () => ({ children, onClose }) => (
  <div>
    <span>{children}</span>
    <button type="button" onClick={onClose}>
      Close alert
    </button>
  </div>
));

describe('Contact page', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders contact form heading and submit button', () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { name: 'Contact Me!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('shows email validation message when submitting invalid form', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const fields = screen.getAllByRole('textbox');
    await user.type(fields[0], 'Alex');
    await user.type(fields[1], 'not-an-email');
    await user.type(fields[2], 'Hello there');

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('shows required field messages for blank values', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const fields = screen.getAllByRole('textbox');
    await user.type(fields[0], ' ');
    await user.type(fields[1], ' ');
    await user.type(fields[2], ' ');

    expect(screen.getAllByText('Please enter a value')).toHaveLength(3);
  });

  it('submits valid data and shows success message', async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    render(<Contact />);

    const fields = screen.getAllByRole('textbox');
    await user.type(fields[0], 'Alex');
    await user.type(fields[1], 'alex@example.com');
    await user.type(fields[2], 'Hello there');

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Alex',
        email: 'alex@example.com',
        message: 'Hello there',
        website: '',
      }),
    });

    expect(screen.getByText('Your message has been sent!')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close alert' }));
    expect(screen.queryByText('Your message has been sent!')).not.toBeInTheDocument();
  });

  it('disables submit button while request is in flight', async () => {
    const user = userEvent.setup();
    let resolveRequest;
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        })
    );

    render(<Contact />);

    const fields = screen.getAllByRole('textbox');
    await user.type(fields[0], 'Alex');
    await user.type(fields[1], 'alex@example.com');
    await user.type(fields[2], 'Hello there');

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();

    resolveRequest({ ok: true, json: async () => ({ ok: true }) });

    expect(await screen.findByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('shows an error alert if submission fails', async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: 'Something went wrong while sending your message. Please try again.',
      }),
    });

    render(<Contact />);

    const fields = screen.getAllByRole('textbox');
    await user.type(fields[0], 'Alex');
    await user.type(fields[1], 'alex@example.com');
    await user.type(fields[2], 'Hello there');

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('Something went wrong while sending your message. Please try again.')
    ).toBeInTheDocument();
  });
});
