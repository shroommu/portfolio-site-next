import styled from "styled-components";
import { colors, footerHeight } from "../constants";
import { device } from "../../constants";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: ${colors.darkBlue};
  position: absolute;
  overflow: hidden;

  @media ${device.tablet} {
    overflow-y: scroll;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin: -50px -50px 0 0;
  padding: 50px 50px 0 0;
  height: 100%;

  @media ${device.tablet} {
    overflow: unset;
    overflow-x: clip;
    overflow-y: visible;
    background: linear-gradient(
      180deg,
      hsl(53deg 68% 78%) 0%,
      hsl(39deg 68% 70%) 9%,
      hsl(32deg 65% 62%) 18%,
      hsl(27deg 62% 53%) 27%,
      hsl(24deg 57% 48%) 36%,
      hsl(26deg 32% 48%) 45%,
      hsl(47deg 7% 47%) 55%,
      hsl(189deg 31% 42%) 64%,
      hsl(192deg 60% 33%) 73%,
      hsl(195deg 61% 27%) 82%,
      hsl(200deg 63% 21%) 91%,
      hsl(207deg 69% 15%) 100%
    );
  }
`;

export const BackgroundGrass = styled.div`
  flex: 1;
  background-color: #0c2941;
  height: 100%;
  z-index: 0;
  width: 100%;
  position: absolute;

  @media ${device.tablet} {
    display: none;
  }
`;

export const Heading = styled.h1`
  font-family: Delicious Handrawn;
  color: ${colors.darkestBlue};
  margin: 0 0 12px 0;
  font-size: 42px;
`;

export const WebsiteName = styled.div`
  font-family: Delicious Handrawn;
  color: ${colors.white};
  font-size: 48px;

  @media ${device.mobile} {
    font-size: 36px;
  }
`;

export const Filler = styled.div`
  flex: 1;
`;
