import styled from "styled-components";
import { Icon } from "../assets";
// import closeIcon from "../assets/icons/x-Icon.png";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(p) => p.color};
  padding: 8px;
  border-radius: 4px;
`;

export default function Alert({ testId, children, color, onClose }) {
  return (
    <Container test-id={testId} color={color}>
      {children}
      {/* <Icon src={closeIcon} height="16px" margin="0" onClick={onClose} /> */}
    </Container>
  );
}
