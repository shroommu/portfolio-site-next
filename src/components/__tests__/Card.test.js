import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(
      <Card>
        <div>Card content</div>
      </Card>
    );

    expect(container.firstChild).toHaveStyle('border-radius: 30px');
    expect(container.firstChild).toHaveStyle('padding: 36px');
  });
});
