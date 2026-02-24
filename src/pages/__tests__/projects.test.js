import { render, screen } from '@testing-library/react';
import Projects from '../projects';

jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn(),
}));

jest.mock('../projects/ProjectCard', () => ({ postPreview }) => (
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
});
