import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import TextArea from '../TextArea';

describe('TextArea', () => {
  it('renders the current value', () => {
    render(<TextArea value="hello" onChange={() => {}} />);

    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('calls onChange with the new value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    function TextAreaHarness() {
      const [value, setValue] = useState('');
      return (
        <TextArea
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            onChange(nextValue);
          }}
        />
      );
    }

    render(<TextAreaHarness />);

    const textArea = screen.getByRole('textbox');
    await user.type(textArea, 'abc');

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith('abc');
  });
});
