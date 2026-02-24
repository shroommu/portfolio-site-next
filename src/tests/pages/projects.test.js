import { render, screen } from '@testing-library/react';
import fs from 'fs';
import Projects, { getStaticProps } from '../../pages/projects';
import { serialize } from 'next-mdx-remote/serialize';

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn(),
}));

jest.mock('../../features/projects/ProjectCard', () => ({ postPreview }) => (
  <div>{postPreview.title}</div>
));

describe('Projects page', () => {
  it('renders projects heading and project previews', () => {
    render(
      <Projects
        postPreviews={[
          { slug: 'first-project', title: 'First Project' },
          { slug: 'second-project', title: 'Second Project' },
        ]}
      />
    );

    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByText('First Project')).toBeInTheDocument();
    expect(screen.getByText('Second Project')).toBeInTheDocument();
  });

  it('loads mdx previews in getStaticProps', async () => {
    fs.readdirSync.mockReturnValue(['one.mdx', 'ignore.txt']);
    fs.readFileSync.mockReturnValue('file contents');
    serialize.mockResolvedValue({ frontmatter: { title: 'One' } });

    const result = await getStaticProps();

    expect(fs.readdirSync).toHaveBeenCalledWith('_projects');
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
