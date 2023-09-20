import styled from "styled-components";

const Container = styled.div``;

export default function Link({ href, onClick, children }) {
  return (
    <Container>
      <a
        href={href}
        onClick={onClick}
        tabIndex={0}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    </Container>
  );
}
