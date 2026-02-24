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
});
