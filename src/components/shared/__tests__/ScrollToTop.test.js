import { render, screen } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

const mockUseRouter = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => mockUseRouter(),
}));

describe('ScrollToTop', () => {
  it('scrolls content container to top when pathname changes', () => {
    const scroll = jest.fn();
    const getElementById = jest.spyOn(document, 'getElementById').mockReturnValue({ scroll });

    mockUseRouter.mockReturnValue({ pathname: '/blog' });

    render(
      <ScrollToTop>
        <div>Child content</div>
      </ScrollToTop>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
    expect(getElementById).toHaveBeenCalledWith('content-container');
    expect(scroll).toHaveBeenCalledWith(0, 0);

    getElementById.mockRestore();
  });
});
