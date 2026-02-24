import { render, screen } from '@testing-library/react';
import Section from '../Section';

describe('Section', () => {
  it('renders children', () => {
    render(
      <Section>
        <div>Section content</div>
      </Section>
    );

    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('applies default margin and padding styles', () => {
    const { container } = render(
      <Section>
        <div>Section content</div>
      </Section>
    );

    expect(container.firstChild).toHaveStyle('margin: 0 0 36px 0');
    expect(container.firstChild).toHaveStyle('padding: 64px 200px 0 350px');
  });
});
