import styled from "styled-components";
import Link from "next/link";
import { device, locationsWithLabels } from "../../pages/constants";
import { colors } from "../constants";

const Container = styled.div`
  z-index: 199;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  position: absolute;
  margin-top: 75px;
  width: 100%;

  @media ${device.tablet} {
    padding-top: 50px;
    box-shadow: 0px 20px 20px 10px ${colors.darkestBlue};
  }

  @media ${device.mobile} {
    padding-top: 25px;
    box-shadow: 0px 10px 10px 5px ${colors.darkestBlue};
  }
`;

const NavItemList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  font-family: Bitter;
  padding: 18px 0;
  text-align: center;
  list-style-type: none;
  border-bottom: 2px solid ${colors.darkestBlue};

  @media ${device.tablet} {
    font-size: 24px;
  }

  @media ${device.mobile} {
    font-size: unset;
  }
`;

const navItems = [
  locationsWithLabels.INDEX,
  locationsWithLabels.BLOG,
  locationsWithLabels.CONTACT,
];

export default function Menu({ onNavigate }) {
  return (
    <Container>
      <NavItemList>
        {navItems.map((navItem) => {
          return (
            <Link href={navItem.path} onClick={onNavigate} key={navItem.label}>
              <NavItem>{navItem.label}</NavItem>
            </Link>
          );
        })}
      </NavItemList>
    </Container>
  );
}
