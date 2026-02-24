import { render, screen } from '@testing-library/react';
import Blog, { getStaticProps } from '../../pages/blog';
import { getMdxPreviews } from '../../lib/content';

jest.mock('../../lib/content', () => ({
  getMdxPreviews: jest.fn(),
}));

jest.mock('../../features/blog/BlogCard', () => ({ postPreview }) => (
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
    getMdxPreviews.mockResolvedValue([{ title: 'One', slug: 'one' }]);

    const result = await getStaticProps();

    expect(getMdxPreviews).toHaveBeenCalledWith('_posts');
    expect(result).toEqual({
      props: {
        postPreviews: [{ title: 'One', slug: 'one' }],
      },
      revalidate: 60,
    });
  });
});
