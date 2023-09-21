import React from "react";
import Link from "next/link";

import styled from "styled-components";
import { colors, footerHeight } from "../../components/constants";
import { locations, device } from "../constants";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${footerHeight}px;
  background: ${colors.darkestBlue};
  margin: 0 -50px 0 0;
  z-index: 1;
  padding: 25px 75px 25px 25px;
`;

const ContentContainer = styled.div`
  margin-left: auto;
  @media ${device.tablet} {
    margin-left: 0;
  }
`;

const CopyrightContainer = styled.div`
  color: ${colors.white};
  margin-top: 8px;
  text-align: right;

  @media ${device.tablet} {
    text-align: center;
  }
`;

export const WebsiteName = styled.div`
  font-family: Delicious Handrawn;
  color: ${colors.white};
  font-size: 36px;

  @media ${device.mobile} {
    font-size: 24px;
  }
`;

export default function Footer() {
  return (
    <Container test-id="footer-container">
      <ContentContainer>
        <Link href={locations.INDEX}>
          <WebsiteName>Alexa Kruckenberg</WebsiteName>
        </Link>
        <CopyrightContainer>Copyright 2023</CopyrightContainer>
      </ContentContainer>
    </Container>
  );
}
