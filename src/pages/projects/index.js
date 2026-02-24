import styled from "styled-components";

import Section from "../../components/Section";
import Card from "../../components/Card";
import { Heading } from "../../components/shared";

import { device } from "../../constants";
import { getMdxPreviews } from "../../lib/content";

import ProjectCard from "../../features/projects/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-evenly;

  @media ${device.laptop} {
    flex-direction: column;
    align-items: center;
  }
`;

export default function Projects({ postPreviews }) {
  return (
    <Section testId="project-home-section">
      <Card testId="project-home-card">
        <Container data-testid="project-card-content-container">
          <Heading>Projects</Heading>
          <ContentContainer data-testid="project-posts-container">
            {postPreviews.map((postPreview) => {
              return (
                <ProjectCard
                  postPreview={postPreview}
                  key={postPreview.slug}
                  testId={`project-card-${postPreview.slug}`}
                />
              );
            })}
          </ContentContainer>
        </Container>
      </Card>
    </Section>
  );
}

export async function getStaticProps() {
  const postPreviews = await getMdxPreviews("_projects");

  return {
    props: {
      postPreviews,
    },
    revalidate: 60,
  };
}
