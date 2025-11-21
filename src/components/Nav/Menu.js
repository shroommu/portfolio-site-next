import styled from "styled-components";
import Link from "next/link";
import { device, locationsWithLabels } from "../../constants";
import { colors } from "../constants";

const Container = styled.div`
  z-index: 199;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  position: absolute;
  top: ${p => p.show ? 0 : "-50%"};
  margin-top: 75px;
  width: 100%;
  transition: top .5s ease-in-out;

  @media ${device.tablet} {
    padding-top: 50px;
    box-shadow: 0px 20px 20px 10px #0a20333d;
  }

  @media ${device.mobile} {
    padding-top: 25px;
    box-shadow: 0px 10px 10px 5px #0a20333d;
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
  border-bottom: 1px solid ${colors.darkestBlue};

  @media ${device.tablet} {
    font-size: 24px;
  }

  @media ${device.mobile} {
    font-size: unset;
  }
`;

const navItems = [
  locationsWithLabels.INDEX,
  locationsWithLabels.PROJECTS,
  locationsWithLabels.BLOG,
  locationsWithLabels.CONTACT,
];

export default function Menu({ onNavigate, show }) {
  console.log(show)
  return (
    <Container show={show}>
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
