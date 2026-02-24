import { render, screen } from '@testing-library/react';
import App from '../_app';

jest.mock('../global.css', () => ({}));

jest.mock('../../components/shared/Header.js', () => () => <div>Header</div>);
jest.mock('../../components/shared/Footer.js', () => () => <div>Footer</div>);
jest.mock('../../components/shared/Background.js', () => () => <div>Background</div>);
jest.mock('../../components/shared/ScrollToTop', () => ({ children }) => (
  <div>
    <div>ScrollToTop</div>
    {children}
  </div>
));

jest.mock('../../components/shared/index.js', () => ({
  ContentContainer: ({ children, id }) => <div id={id}>{children}</div>,
  PageContainer: ({ children }) => <div>{children}</div>,
  BackgroundGrass: () => <div>BackgroundGrass</div>,
  Filler: () => <div>Filler</div>,
}));

describe('_app', () => {
  it('renders global shell with page component', () => {
    const Page = () => <div>Page</div>;

    render(<App Component={Page} pageProps={{}} />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('ScrollToTop')).toBeInTheDocument();
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('Filler')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('BackgroundGrass')).toBeInTheDocument();
  });
});
