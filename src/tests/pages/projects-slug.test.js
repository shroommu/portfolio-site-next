import { render, screen } from '@testing-library/react';
import PostPage, { getStaticPaths, getStaticProps } from '../../pages/projects/[slug]';
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

jest.mock('../../features/projects/ProjectPost', () => ({ source, children }) => (
  <div>
    <div>{source.frontmatter.title}</div>
    {children}
  </div>
));

describe('Projects [slug] page', () => {
  it('renders title and MDX content', () => {
    const source = { frontmatter: { title: 'Dynamic Project Post' } };

    render(<PostPage source={source} />);

    expect(screen.getAllByText('Dynamic Project Post').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('MDX body')).toBeInTheDocument();
  });

  it('returns blocking fallback static paths', async () => {
    getMdxSlugPaths.mockReturnValue([{ params: { slug: 'pokedex' } }]);

    const result = await getStaticPaths();

    expect(getMdxSlugPaths).toHaveBeenCalledWith('_projects');
    expect(result).toEqual({ paths: [{ params: { slug: 'pokedex' } }], fallback: false });
  });

  it('loads and serializes mdx in getStaticProps', async () => {
    getMdxSourceBySlug.mockResolvedValue({
      frontmatter: { title: 'Loaded' },
      compiledSource: 'compiled',
    });

    const result = await getStaticProps({ params: { slug: 'pokedex' } });

    expect(getMdxSourceBySlug).toHaveBeenCalledWith('_projects', 'pokedex');
    expect(result).toEqual({
      props: {
        source: { frontmatter: { title: 'Loaded' }, compiledSource: 'compiled' },
      },
      revalidate: 60,
    });
  });
});
