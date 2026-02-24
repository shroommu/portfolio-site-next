import { render, screen } from '@testing-library/react';
import Blog from '../blog';

jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn(),
}));

jest.mock('../blog/BlogCard', () => ({ postPreview }) => (
  <div>{postPreview.title}</div>
));

describe('Blog page', () => {
  it('renders blog heading and post previews', () => {
    render(
      <Blog
        postPreviews={[
          { slug: 'first-post', title: 'First Post' },
          { slug: 'second-post', title: 'Second Post' },
        ]}
      />
    );

    expect(screen.getByRole('heading', { name: 'Blog Posts' })).toBeInTheDocument();
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });
});
