import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Input from '../Input';

describe('Input', () => {
  it('renders the current value', () => {
    render(<Input value="hello" onChange={() => {}} />);

    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('calls onChange with the new value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    function InputHarness() {
      const [value, setValue] = useState('');
      return (
        <Input
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            onChange(nextValue);
          }}
        />
      );
    }

    render(<InputHarness />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'abc');

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith('abc');
  });
});
