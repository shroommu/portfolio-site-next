import React from "react";
import { useCallback, useState } from "react";
import Link from "next/link";

import styled from "styled-components";
import { colors } from "../constants";
import { Icon as UnstyledIcon } from "../../../public/assets/index.js";
import { MdMenu, MdClose } from "react-icons/md";

import Button, { themes } from "../Button";
import ExternalLink from "../Link";
import Nav from "../Nav/index.js";
import Menu from "../Nav/Menu";
import { device, locations } from "../../constants";
import { WebsiteName } from ".";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 201;
`;

const NavigationBar = styled.nav`
  display: flex;
  height: 100px;
  background: ${colors.darkestBlue};
  z-index: 201;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;

  @media ${device.tablet} {
    justify-content: center;
    height: 50px;
    padding: 12px;
  }
`;

const MenuIcon = styled(MdMenu)`
  display: none;

  @media ${device.tablet} or ${device.mobile} {
    display: block;
    color: ${colors.white};
    font-size: 36px;
    margin-right: 24px;
  }
`;

const MenuCloseIcon = styled(MdClose)`
  display: none;

  @media ${device.tablet} or ${device.mobile} {
    display: block;
    color: ${colors.white};
    font-size: 36px;
    margin-right: 24px;
  }
`;

const SocialsContainer = styled.div`
  display: flex;

  @media ${device.tablet} {
    display: none;
  }
`;

const Leaves = styled.div`
  margin-top: -50px;
  background-repeat: repeat-x;
  background: radial-gradient(
    ellipse at center,
    ${colors.darkestBlue} 0px,
    ${colors.darkestBlue} 50px,
    transparent 51px
  );
  background-size: 100px 100px;
  background-position: 5px center;
  width: 100%;
  height: 100px;
  z-index: 200;

  @media ${device.mobile} {
    margin-top: -25px;
    background: radial-gradient(
      ellipse at center,
      ${colors.darkestBlue} 0px,
      ${colors.darkestBlue} 25px,
      transparent 26px
    );
    background-size: 50px 50px;
    height: 50px;
  }
`;

const SocialIcon = styled(UnstyledIcon)`
  &:hover {
    transform: translate(0, -5px) rotate(2deg);
  }
`;

export default function Header({ location }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu, setShowMenu]);

  return (
    <Container>
      <NavigationBar>
        {showMenu ? (
          <MenuCloseIcon onClick={toggleShowMenu} />
        ) : (
          <MenuIcon onClick={toggleShowMenu} />
        )}
        <Link href={locations.INDEX}>
          <WebsiteName>Alex Kruckenberg</WebsiteName>
        </Link>
        <Nav location={location} />
        <SocialsContainer>
          <Link href={locations.CONTACT}>
            <Button margin="0 16px 0 0" fontSize="24px" theme={themes.tertiary}>
              Contact
            </Button>
          </Link>
          <ExternalLink href="http://instagram.com/shroommu">
            <SocialIcon
              src="/assets/icons/icons8-instagram-64.png"
              height="48px"
              margin="0 8px 0 0"
              alt="instagram icon"
            />
          </ExternalLink>
          <ExternalLink href="http://github.com/shroommu">
            <SocialIcon
              src="/assets/icons/icons8-github-64.png"
              height="48px"
              margin="0 8px 0 0"
              alt="github icon"
            />
          </ExternalLink>
          <ExternalLink href="http://linkedin.com/in/alex-kruckenberg">
            <SocialIcon
              src="/assets/icons/icons8-linkedin-64.png"
              height="48px"
              margin="0"
              alt="linkedin icon"
            />
          </ExternalLink>
        </SocialsContainer>
      </NavigationBar>
      <Leaves />
      <Menu onNavigate={() => setShowMenu(false)} show={showMenu}/>
    </Container>
  );
}
