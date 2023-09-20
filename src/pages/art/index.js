import styled from "styled-components";

import Section from "../../components/Section";
import Card from "../../components/Card";

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  position: relative;
`;

export default function Art() {
  return (
    <Container>
      <Section testId="art-section">
        <Card></Card>
      </Section>
    </Container>
  );
}
