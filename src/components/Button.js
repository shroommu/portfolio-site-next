import styled from "styled-components";
import { colors } from "./constants";

export const themes = {
  default: {
    background: colors.defaultButton.background,
    hover: colors.defaultButton.hover,
    active: colors.defaultButton.active,
    fontColor: colors.defaultButton.fontColor,
  },
  secondary: {
    background: colors.secondaryButton.background,
    hover: colors.secondaryButton.hover,
    active: colors.secondaryButton.active,
    fontColor: colors.secondaryButton.fontColor,
  },
  tertiary: {
    background: colors.tertiaryButton.background,
    hover: colors.tertiaryButton.hover,
    active: colors.tertiaryButton.active,
    disabled: colors.tertiaryButton.disabled,
    fontColor: colors.tertiaryButton.fontColor,
  },
};

const ButtonContainer = styled.button`
  display: flex;
  padding: 8px;
  margin: ${(p) => p.margin};
  background: ${(p) => p.theme.background};
  height: fit-content;
  width: fit-content;
  border-radius: 10px;
  font-family: ${(p) => p.fontFamily};
  font-size: ${(p) => p.fontSize};
  color: ${(p) => p.theme.fontColor};

  &:hover {
    background: ${(p) => p.theme.hover};
  }

  &:active {
    background: ${(p) => p.theme.active};
  }

  ${(p) =>
    p.disabled &&
    `background: ${p.theme.disabled};
    cursor: not-allowed;
    
    &:hover {
      background: ${p.theme.disabled};
    }

    &:active {
      background: ${p.theme.disabled};
    }
    `}
`;

export default function Button({
  children,
  onClick,
  margin,
  fontSize,
  fontFamily,
  theme,
  type,
  disabled,
}) {
  return (
    <ButtonContainer
      onClick={onClick}
      margin={margin}
      fontSize={fontSize}
      fontFamily={fontFamily}
      theme={theme}
      type={type}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  );
}

Button.defaultProps = {
  theme: themes.default,
  fontFamily: "Delicious Handrawn",
};
