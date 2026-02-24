import { render, screen } from '@testing-library/react';
import LabeledElement from '../LabeledElement';

describe('LabeledElement', () => {
  it('renders label, required marker, child, and error', () => {
    render(
      <LabeledElement label="Name" required error="Required field">
        <input aria-label="Name input" />
      </LabeledElement>
    );

    expect(screen.getByText('Name*')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Name input' })).toBeInTheDocument();
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });
});
