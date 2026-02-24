import { render, screen } from '@testing-library/react';
import BlogPost from '../../../features/blog/BlogPost';

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

describe('BlogPost', () => {
  it('renders title, date, content, and back link', () => {
    render(
      <BlogPost source={{ frontmatter: { title: 'My Post', date: 'Jan 1, 2026' } }}>
        <div>Post body</div>
      </BlogPost>
    );

    expect(screen.getByRole('heading', { name: 'My Post' })).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2026')).toBeInTheDocument();
    expect(screen.getByText('Post body')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← Back' })).toHaveAttribute('href', '/blog/');
  });
});
