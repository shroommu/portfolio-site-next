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
      {/* <Link href={locations.ART}>
        <Button
          margin="0 8px 0 0"
          fontSize="24px"
          theme={
            location.pathname === locations.ART
              ? themes.secondary
              : themes.default
          }
        >
          Art
        </Button>
      </Link> */}
      {/* <Link href={locations.CODE}>
        <Button
          margin="0 8px 0 0"
          fontSize="24px"
          theme={
            location.pathname === locations.CODE
              ? themes.secondary
              : themes.default
          }
        >
          Code
        </Button>
      </Link> */}
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
