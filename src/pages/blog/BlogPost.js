import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import Section from "../../components/Section";
import { Header1 } from "./styles";

import postMetaData from "../../data/blogMetadata.json";
import { locations } from "../constants";

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

export default function BlogPost() {
  const location = useRouter();

  const pageSlug = location.pathname.split("/")[3];

  const thisPostMetaData = postMetaData.filter(
    (post) => post.slug.split("/")[1] === pageSlug
  )[0];

  return (
    <Section testId="blog-post-section">
      <Card testId="blog-post-card">
        <Container testId="blog-post-container">
          <Header1>{thisPostMetaData.title}</Header1>
          <Date>{thisPostMetaData.date}</Date>
          {/* <Outlet /> */}
          <BackLinkContainer>
            <Link href={locations.BLOG}>← Back</Link>
          </BackLinkContainer>
        </Container>
      </Card>
    </Section>
  );
}
