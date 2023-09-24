import styled from "styled-components";

import tree1 from "./svg/tree1.svg";
import tree2 from "./svg/tree2.svg";
import tree3 from "./svg/tree3.svg";
import texturedTree1 from "./svg/texturedTree1.svg";
import texturedTree2 from "./svg/texturedTree2.svg";
import texturedTree3 from "./svg/texturedTree3.svg";

import { treeStyles, iconStyles } from "./utils";

export const Tree1 = styled(tree1)`
  ${(props) => treeStyles(props)}
`;
export const Tree2 = styled(tree2)`
  ${(props) => treeStyles(props)}
`;
export const Tree3 = styled(tree3)`
  ${(props) => treeStyles(props)}
`;
export const TexturedTree1 = styled(texturedTree1)`
  ${(props) => treeStyles(props)}
`;
export const TexturedTree2 = styled(texturedTree2)`
  ${(props) => treeStyles(props)}
`;
export const TexturedTree3 = styled(texturedTree3)`
  ${(props) => treeStyles(props)}
`;

export const Icon = styled.img`
  ${(props) => iconStyles(props)};
`;
