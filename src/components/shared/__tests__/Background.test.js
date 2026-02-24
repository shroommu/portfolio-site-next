import { act, render } from '@testing-library/react';
import Background from '../Background';

jest.mock('../../../../public/assets', () => {
  const MockTree = (props) => <svg data-testid={props.testId || 'tree'} />;
  return {
    Tree1: MockTree,
    Tree2: MockTree,
    Tree3: MockTree,
    Tree4: MockTree,
    Tree5: MockTree,
    TexturedTree1: MockTree,
    TexturedTree2: MockTree,
    TexturedTree3: MockTree,
  };
});

jest.mock('../../../../public/assets/svg/fox.svg', () => ({
  __esModule: true,
  default: (props) => <svg data-testid={props['data-testid'] || 'fox'} />,
}));

describe('Background', () => {
  it('renders and responds to resize', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    render(<Background />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    addEventListenerSpy.mockRestore();
  });
});
