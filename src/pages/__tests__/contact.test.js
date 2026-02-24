import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../contact';

jest.mock('../../components/Alert', () => ({ children }) => <div>{children}</div>);

describe('Contact page', () => {
  it('renders contact form heading and submit button', () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { name: 'Contact Me!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('shows email validation message when submitting invalid form', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('submits valid data and shows success message', async () => {
    const user = userEvent.setup();
    const open = jest.fn();
    const setRequestHeader = jest.fn();
    const send = jest.fn();

    const originalXmlHttpRequest = global.XMLHttpRequest;
    global.XMLHttpRequest = jest.fn(() => ({
      open,
      setRequestHeader,
      send,
    }));

    try {
      render(<Contact />);

      const fields = screen.getAllByRole('textbox');
      await user.type(fields[0], 'Alex');
      await user.type(fields[1], 'alex@example.com');
      await user.type(fields[2], 'Hello there');

      await user.click(screen.getByRole('button', { name: 'Submit' }));

      expect(global.XMLHttpRequest).toHaveBeenCalledTimes(1);
      expect(open).toHaveBeenCalledWith(
        'POST',
        'https://bvgqo6ynu7.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer',
        true
      );
      expect(setRequestHeader).toHaveBeenCalledWith('Accept', 'application/json; charset=utf-8');
      expect(setRequestHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/json; charset=UTF-8'
      );
      expect(send).toHaveBeenCalledWith(
        JSON.stringify({
          name: 'Alex',
          email: 'alex@example.com',
          message: 'Hello there',
        })
      );

      expect(screen.getByText('Your message has been sent!')).toBeInTheDocument();
    } finally {
      global.XMLHttpRequest = originalXmlHttpRequest;
    }
  });
});
