import { render, screen } from '@testing-library/react';
import FallingLeaves from '../FallingLeaves';
import { loadFull } from 'tsparticles';

jest.mock('react-particles', () => {
  return ({ id, init }) => {
    init('engine');
    return <div data-testid="particles">{id}</div>;
  };
});

jest.mock('tsparticles', () => ({
  loadFull: jest.fn(),
}));

describe('FallingLeaves', () => {
  it('renders particles and initializes engine', () => {
    render(<FallingLeaves />);

    expect(screen.getByTestId('particles')).toHaveTextContent('fallingLeaves');
    expect(loadFull).toHaveBeenCalledWith('engine');
  });
});
