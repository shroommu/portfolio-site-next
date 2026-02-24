import { render, screen } from '@testing-library/react';
import Document from '../_document';

jest.mock('next/document', () => ({
  Html: ({ children }) => <div>{children}</div>,
  Head: ({ children }) => <div>{children}</div>,
  Main: () => <div>Main</div>,
  NextScript: () => <div>NextScript</div>,
}));

describe('_document', () => {
  it('renders document shell and favicon link', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Document />);

    const faviconLink = document.querySelector('link[rel="shortcut icon"]');
    expect(faviconLink).toHaveAttribute('href', '/images/favicon.ico');
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('NextScript')).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
