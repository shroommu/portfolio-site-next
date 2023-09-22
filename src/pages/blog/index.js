import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import styled from "styled-components";

import Section from "../../components/Section";
import Card from "../../components/Card";
import { Heading } from "../../components/shared";

import { device } from "../../constants";

import BlogCard from "./BlogCard";

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
        <Container test-id="blog-card-content-container">
          <Heading>Blog Posts</Heading>
          <ContentContainer test-id="blog-posts-container">
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
  const postFilePaths = fs.readdirSync("_posts").filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews = [];

  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`_posts/${postFilePath}`, "utf8");

    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost.frontmatter,
      slug: postFilePath.replace(".mdx", ""),
    });
  }

  return {
    props: {
      postPreviews: postPreviews,
    },
    revalidate: 60,
  };
}
