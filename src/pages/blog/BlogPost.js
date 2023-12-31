import styled from "styled-components";
import Link from "next/link";
import Card from "../../components/Card";
import Section from "../../components/Section";
import { Header1 } from "../../components/Blog/styles";

import { locations } from "../../constants";

const Container = styled.article`
  display: flex;
  flex-direction: column;
`;

const Date = styled.div`
  text-align: center;
  margin-bottom: 12px;
`;

const BackLinkContainer = styled.div`
  margin: 0 auto;
  text-decoration: underline;
`;

export default function BlogPost({ source, children }) {
  return (
    <Section testId="blog-post-section">
      <Card testId="blog-post-card">
        <Container testId="blog-post-container">
          <Header1>{source?.frontmatter?.title}</Header1>
          <Date>{source?.frontmatter?.date}</Date>
          {children}
          <BackLinkContainer>
            <Link href={locations.BLOG}>← Back</Link>
          </BackLinkContainer>
        </Container>
      </Card>
    </Section>
  );
}
