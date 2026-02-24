import { render, screen } from '@testing-library/react';
import fs from 'fs';
import PostPage, { getStaticPaths, getStaticProps } from '../../pages/projects/[slug]';
import { serialize } from 'next-mdx-remote/serialize';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

jest.mock('next-mdx-remote', () => ({
  MDXRemote: () => <div>MDX body</div>,
}));

jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn(),
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
    const result = await getStaticPaths();

    expect(result).toEqual({ paths: [], fallback: 'blocking' });
  });

  it('loads and serializes mdx in getStaticProps', async () => {
    fs.readFileSync.mockReturnValue('mdx content');
    serialize.mockResolvedValue({ frontmatter: { title: 'Loaded' }, compiledSource: 'compiled' });

    const result = await getStaticProps({ params: { slug: 'pokedex' } });

    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining('/_projects/pokedex.mdx')
    );
    expect(serialize).toHaveBeenCalledWith('mdx content', { parseFrontmatter: true });
    expect(result).toEqual({
      props: {
        source: { frontmatter: { title: 'Loaded' }, compiledSource: 'compiled' },
      },
      revalidate: 60,
    });
  });
});
