import { render, screen } from '@testing-library/react';
import ProjectCard from '../ProjectCard';

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

jest.mock('next/image', () => {
  return ({ alt }) => <img alt={alt} />;
});

describe('ProjectCard', () => {
  it('renders preview content and link', () => {
    render(
      <ProjectCard
        postPreview={{
          slug: 'my-project',
          image: '/image.png',
          title: 'My Project',
          excerpt: 'Preview text',
          tags: ['node', 'next'],
        }}
      />
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects/my-project');
    expect(screen.getByText('My Project')).toBeInTheDocument();
    expect(screen.getByText('Preview text')).toBeInTheDocument();
    expect(screen.getByText('#node')).toBeInTheDocument();
    expect(screen.getByText('#next')).toBeInTheDocument();
    expect(screen.getByText('Read More →')).toBeInTheDocument();
  });
});
