import styled from "styled-components";
import Image from "next/image";

import Card from "../../components/Card";
import Section from "../../components/Section";

import { Heading as StyleableHeading } from "../shared";
import { device } from "../constants";
import { colors } from "../../components/constants";

import pfp from "../../../public/assets/images/pfp-circle.png";

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  flex: 2;
  margin-right: 24px;

  @media ${device.mobile} {
    margin-right: 0;
  }
`;

const Heading = styled(StyleableHeading)`
  @media ${device.mobile} {
    text-align: center;
  }
`;

const SubHeading = styled.h2`
  font-family: Delicious Handrawn;
  color: ${colors.darkBlue};
  margin: 0 0 18px 0;
  font-size: 24px;

  @media ${device.mobile} {
    text-align: center;
  }
`;

const Paragraph = styled.p`
  display: block;
  margin-bottom: 12px;
  text-align: justify;

  @media ${device.mobile} {
    text-align: center;
    font-size: 12px;
  }
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  @media ${device.laptop} {
    margin-bottom: 24px;
  }
`;

const ProfilePicture = styled(Image)`
  object-fit: contain;
  flex: 1;
  margin-bottom: 24px;
  display: block;
  max-width: 100%;
  max-height: 300px;
  color: transparent;
  width: fit-content;
  height: fit-content;
  margin-bottom: auto;

  @media ${device.mobile} {
    max-height: 150px;
  }
`;

export default function Greeting() {
  return (
    <Section testId="greeting-section">
      <Card testId="greeting-card">
        <Container test-id="greeting-container">
          <ProfilePictureContainer test-id="profile-picture-container">
            <ProfilePicture
              src={pfp}
              test-id="profile-picture"
              alt="a picture of the author"
              priority
            />
          </ProfilePictureContainer>
          <TextContainer test-id="greeting-text-container">
            <Heading test-id="greeting-header">Hi, I&apos;m Alexa!</Heading>
            <SubHeading test-id="greeting-subheader">
              Software Developer, Artist, Pokemon Enthusiast
            </SubHeading>
            <Paragraph>
              I&apos;m a curious person who loves to create and learn.
              You&apos;ll find me anywhere that code and art interact, plus a
              few other places besides. Keep scrolling to see what I&apos;m
              working on!
            </Paragraph>
            <Paragraph>
              I&apos;m local to the Seattle area, where I live with one person
              and two cats. When I&apos;m not coding, writing, or otherwise
              creating, I like to play video games (especially Pokemon Go) and
              try new restaurants.
            </Paragraph>
            <Paragraph>Thanks for visiting my site!</Paragraph>
          </TextContainer>
        </Container>
      </Card>
    </Section>
  );
}
