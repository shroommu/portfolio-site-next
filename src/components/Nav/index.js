import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Button, { themes } from "../Button";
import { device, locations } from "../../constants";

const NavButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  @media ${device.tablet} {
    display: none;
  }
`;

export default function Nav({ location }) {
  return (
    <NavButtonContainer>
      <Link href={locations.INDEX}>
        <Button
          margin="0 8px 0 0"
          fontSize="24px"
          // theme={
          //   location.pathname === locations.INDEX
          //     ? themes.secondary
          //     : themes.default
          // }
        >
          Home
        </Button>
      </Link>
      <Link href={locations.PROJECTS}>
        <Button
          margin="0 8px 0 0"
          fontSize="24px"
          // theme={
          //   location.pathname === locations.PROJECTS
          //     ? themes.secondary
          //     : themes.default
          // }
        >
          Projects
        </Button>
      </Link>
      <Link href={locations.BLOG}>
        <Button
          margin="0 8px 0 0"
          fontSize="24px"
          // theme={
          //   location.pathname === locations.BLOG
          //     ? themes.secondary
          //     : themes.default
          // }
        >
          Blog
        </Button>
      </Link>
    </NavButtonContainer>
  );
}
