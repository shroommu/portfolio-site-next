import { render, screen } from '@testing-library/react';
import BlogCard from '../../../features/blog/BlogCard';

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

jest.mock('next/image', () => {
  return ({ alt }) => <img alt={alt} />;
});

describe('BlogCard', () => {
  it('renders preview content and link', () => {
    render(
      <BlogCard
        postPreview={{
          slug: 'my-post',
          image: '/image.png',
          title: 'My Post',
          excerpt: 'Preview text',
          tags: ['test', 'react'],
        }}
      />
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/blog/my-post');
    expect(screen.getByText('My Post')).toBeInTheDocument();
    expect(screen.getByText('Preview text')).toBeInTheDocument();
    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('Read More →')).toBeInTheDocument();
  });
});
