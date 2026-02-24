import { render, screen } from '@testing-library/react';
import fs from 'fs';
import Blog, { getStaticProps } from '../blog';
import { serialize } from 'next-mdx-remote/serialize';

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
  readFileSync: jest.fn(),
}));

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

  it('loads mdx previews in getStaticProps', async () => {
    fs.readdirSync.mockReturnValue(['one.mdx', 'ignore.txt']);
    fs.readFileSync.mockReturnValue('file contents');
    serialize.mockResolvedValue({ frontmatter: { title: 'One' } });

    const result = await getStaticProps();

    expect(fs.readdirSync).toHaveBeenCalledWith('_posts');
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(serialize).toHaveBeenCalledWith('file contents', {
      parseFrontmatter: true,
    });
    expect(result).toEqual({
      props: {
        postPreviews: [{ title: 'One', slug: 'one' }],
      },
      revalidate: 60,
    });
  });
});
