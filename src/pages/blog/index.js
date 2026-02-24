import styled from "styled-components";

import Section from "../../components/Section";
import Card from "../../components/Card";
import { Heading } from "../../components/shared";

import { device } from "../../constants";
import { getMdxPreviews } from "../../lib/content";

import BlogCard from "../../features/blog/BlogCard";

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

export default function Blog({ postPreviews }) {
  return (
    <Section testId="blog-home-section">
      <Card testId="blog-home-card">
        <Container data-testid="blog-card-content-container">
          <Heading>Blog Posts</Heading>
          <ContentContainer data-testid="blog-posts-container">
            {postPreviews.map((postPreview) => {
              return (
                <BlogCard
                  postPreview={postPreview}
                  key={postPreview.slug}
                  testId={`blog-card-${postPreview.slug}`}
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
  const postPreviews = await getMdxPreviews("_posts");

  return {
    props: {
      postPreviews,
    },
    revalidate: 60,
  };
}
