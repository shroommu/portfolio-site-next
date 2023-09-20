import styled from "styled-components";
import { ComingSoon } from "../shared";

const Container = styled.div``;

export default function Gallery() {
  return (
    <Container test-id={"gallery"}>
      <ComingSoon />
    </Container>
  );
}
