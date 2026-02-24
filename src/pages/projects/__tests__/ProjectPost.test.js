import { render, screen } from '@testing-library/react';
import ProjectPost from '../ProjectPost';

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

describe('ProjectPost', () => {
  it('renders title, date, content, and back link', () => {
    render(
      <ProjectPost source={{ frontmatter: { title: 'My Project', date: 'Jan 1, 2026' } }}>
        <div>Project body</div>
      </ProjectPost>
    );

    expect(screen.getByRole('heading', { name: 'My Project' })).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2026')).toBeInTheDocument();
    expect(screen.getByText('Project body')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← Back' })).toHaveAttribute('href', '/projects/');
  });
});
