import { css } from "styled-components";

export const treeStyles = ({
  fillColor,
  strokeColor,
  zIndex,
  position,
  rightPos,
  leftPos,
  bottomPos,
  flipX,
  height,
  maxWidth,
}) => {
  return css`
    height: ${height};
    max-width: ${maxWidth};
    position: ${position || "absolute"};
    z-index: ${zIndex};
    overflow: clip;

    right: ${rightPos};
    left: ${leftPos};
    bottom: ${bottomPos};

    ${flipX && "transform: scaleX(-1)"};

    & g {
      fill: none;
      fill-opacity: 1;
    }

    & path {
      stroke: ${strokeColor};
      fill: none;
    }

    & path:first-child {
      fill: ${fillColor};
      stroke: none;
    }
  `;
};

export const iconStyles = ({ height, margin }) => {
  return css`
    height: ${height};
    margin: ${margin};
  `;
};
