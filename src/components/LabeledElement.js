import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: ${(p) => p.width};
`;

const BaseLabel = styled.label`
  padding: 0 0 8px 0;
`;

const BaseError = styled.div`
  padding-top: 4px;
  font-size: 10px;
  color: red;
`;

export default function LabeledElement({
  children,
  childId,
  testId,
  label,
  required,
  error,
  className,
  width,
}) {
  return (
    <Container className={className} width={width}>
      <BaseLabel for={childId} test-id={testId}>
        {label}
        {required && "*"}
      </BaseLabel>
      {children}
      <BaseError>{error}</BaseError>
    </Container>
  );
}
