import { render, screen } from '@testing-library/react';
import {
  PageContainer,
  ContentContainer,
  BackgroundGrass,
  Heading,
  WebsiteName,
  Filler,
} from '../index';

describe('shared styled exports', () => {
  it('renders all shared layout primitives', () => {
    render(
      <PageContainer>
        <ContentContainer>
          <Heading>Heading</Heading>
          <WebsiteName>Name</WebsiteName>
          <BackgroundGrass />
          <Filler />
        </ContentContainer>
      </PageContainer>
    );

    expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
