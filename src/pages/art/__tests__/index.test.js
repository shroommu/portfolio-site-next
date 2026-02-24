import { render, screen } from '@testing-library/react';
import Art from '../index';

jest.mock('../../../components/Section', () => ({ children }) => (
  <section>
    <span>Section</span>
    {children}
  </section>
));
jest.mock('../../../components/Card', () => ({ children }) => (
  <div>
    <span>Card</span>
    {children}
  </div>
));

describe('Art page', () => {
  it('renders art layout containers', () => {
    render(<Art />);

    expect(screen.getByText('Section')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
  });
});
