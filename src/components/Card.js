import styled from "styled-components";

import { colors } from "./constants";
import { device } from "../constants";

const Container = styled.div`
  opacity: 95%;
  display: flex;
  justify-content: center;
  flex: 1;
  background: ${(p) => p.background};
  border-radius: ${(p) => p.borderRadius};
  z-index: ${(p) => p.zIndex};
  padding: ${(p) => p.padding};

  @media ${device.tablet} {
    padding: ${(p) => p.mobilePadding};
  }
`;

export default function Card({
  background,
  borderRadius,
  zIndex,
  padding,
  mobilePadding,
  testId,
  children,
  className,
}) {
  return (
    <Container
      background={background}
      borderRadius={borderRadius}
      padding={padding}
      mobilePadding={mobilePadding}
      test-id={testId}
      zIndex={zIndex}
      className={className}
    >
      {children}
    </Container>
  );
}

Card.defaultProps = {
  background: colors.white,
  borderRadius: "30px",
  zIndex: 30,
  padding: "36px",
  mobilePadding: "24px",
};
