import { render, screen } from '@testing-library/react';
import PostPage, { getStaticPaths, getStaticProps } from '../../pages/blog/[slug]';
import { getMdxSlugPaths, getMdxSourceBySlug } from '../../lib/content';

jest.mock('../../lib/content', () => ({
  getMdxSlugPaths: jest.fn(),
  getMdxSourceBySlug: jest.fn(),
}));

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

jest.mock('next-mdx-remote', () => ({
  MDXRemote: () => <div>MDX body</div>,
}));

jest.mock('../../features/blog/BlogPost', () => ({ source, children }) => (
  <div>
    <div>{source.frontmatter.title}</div>
    {children}
  </div>
));

describe('Blog [slug] page', () => {
  it('renders title and MDX content', () => {
    const source = { frontmatter: { title: 'Dynamic Blog Post' } };

    render(<PostPage source={source} />);

    expect(screen.getAllByText('Dynamic Blog Post').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('MDX body')).toBeInTheDocument();
  });

  it('returns blocking fallback static paths', async () => {
    getMdxSlugPaths.mockReturnValue([{ params: { slug: 'hello-world' } }]);

    const result = await getStaticPaths();

    expect(getMdxSlugPaths).toHaveBeenCalledWith('_posts');
    expect(result).toEqual({ paths: [{ params: { slug: 'hello-world' } }], fallback: false });
  });

  it('loads and serializes mdx in getStaticProps', async () => {
    getMdxSourceBySlug.mockResolvedValue({
      frontmatter: { title: 'Loaded' },
      compiledSource: 'compiled',
    });

    const result = await getStaticProps({ params: { slug: 'hello-world' } });

    expect(getMdxSourceBySlug).toHaveBeenCalledWith('_posts', 'hello-world');
    expect(result).toEqual({
      props: {
        source: { frontmatter: { title: 'Loaded' }, compiledSource: 'compiled' },
      },
      revalidate: 60,
    });
  });
});
