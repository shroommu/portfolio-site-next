import styled from "styled-components";
import { device } from "../pages/constants";

const Container = styled.section`
  display: flex;
  flex: 1;
  padding: ${(p) => p.padding};
  margin: ${(p) => p.margin};

  @media ${device.tablet} {
    padding: 5% 10%;
  }
`;

export default function Section({ testId, children, margin, padding }) {
  return (
    <Container test-id={testId} margin={margin} padding={padding}>
      {children}
    </Container>
  );
}

Section.defaultProps = {
  padding: "64px 200px 0 350px",
  margin: "0 0 36px 0",
};
