import { render, screen } from '@testing-library/react';
import Projects, { getStaticProps } from '../../pages/projects';
import { getMdxPreviews } from '../../lib/content';

jest.mock('../../lib/content', () => ({
  getMdxPreviews: jest.fn(),
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
    getMdxPreviews.mockResolvedValue([{ title: 'One', slug: 'one' }]);

    const result = await getStaticProps();

    expect(getMdxPreviews).toHaveBeenCalledWith('_projects');
    expect(result).toEqual({
      props: {
        postPreviews: [{ title: 'One', slug: 'one' }],
      },
      revalidate: 60,
    });
  });
});
