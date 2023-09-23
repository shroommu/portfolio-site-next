import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { device } from "../../constants";
import { colors } from "../constants";

import { Tree1, Tree2, Tree3, TexturedTree1 } from "../../../public/assets";
import fox from "../../../public/assets/svg/fox.svg";

const BackgroundContainer = styled.div`
  display: flex;
  flex: 1;
  height: 75vh;
  max-height: 650px;
  top: 50px;
  width: 100%;
  justify-content: space-between;
  position: absolute;
  overflow-x: clip;
  //pointer-events: none;
  z-index: 2;

  @media ${device.tablet} {
    display: none;
  }
`;

const GroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: clip;
  position: absolute;
`;

const GroundEllipse = styled.div`
  width: 300%;
  height: 100%;
  flex: 1;
  background: radial-gradient(
    ellipse at center,
    ${colors.darkBlue} 0%,
    ${colors.darkBlue} 55%,
    transparent 55.1%
  );
  position: absolute;
  left: -100%;
  bottom: -50%;

  @media ${device.mobile} {
    display: none;
  }
`;

const SkyFill = styled.div`
  width: 100%;
  flex: 1;
  background: radial-gradient(
    ellipse at 50% 5%,
    #ede49f 0%,
    #ede49f 50%,
    #c86929 90%
  );
`;

const TreesLeftContainer = styled.div`
  display: flex;
  width: 45%;
  height: 100%;
  position: relative;

  @media ${device.tablet} {
    display: none;
  }
`;

const TreesRightContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 30%;
  height: 100%;
  position: relative;

  @media ${device.tablet} {
    display: none;
  }
`;

const FoxTreeContainer = styled.div`
  position: absolute;
  height: 100%;
  max-width: 65%;
`;

const FoxArt = styled(fox)`
  transform: translate(
    calc(calc(${(p) => p.offsetX}px - 200px) / 5),
    calc(${(p) => p.offsetY}px - ${(p) => p.offsetY / 3}px)
  );
  z-index: 22;
  position: absolute;
  max-height: 125px;
`;

export default function Background() {
  const [foxOffset, setFoxOffset] = useState([0, 0]);

  const foxTreeRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  const updateSize = () => {
    const { right, bottom } = foxTreeRef.current?.getBoundingClientRect();
    setFoxOffset([right, bottom]);
  };

  return (
    <BackgroundContainer testId="background-container">
      <GroundContainer testId="ground-container">
        <GroundEllipse testId="ground-elipse" />
        <SkyFill testId="sky-rectangle-fill" />
      </GroundContainer>
      <>
        <TreesLeftContainer testId="trees-left-container">
          <Tree2
            fillColor={colors.closestTree}
            strokeColor={colors.treeTextureDarkest}
            zIndex={23}
            preserveAspectRatio="none"
            rightPos="60%"
            bottomPos="0%"
            height="100%"
            maxWidth="65%"
            testId="closest-tree-left"
          />
          <FoxTreeContainer ref={foxTreeRef}>
            <Tree3
              fillColor={colors.middleTree}
              zIndex={22}
              height="100%"
              maxWidth="100%"
              bottomPos="5%"
              preserveAspectRatio="none"
              position="relative"
              testId="middle-tree-left"
            />
          </FoxTreeContainer>
          <FoxArt
            test-id="fox-art"
            offsetX={foxOffset[0]}
            offsetY={foxOffset[1]}
          />
          <TexturedTree1
            fillColor={colors.furthestTree}
            strokeColor={colors.treeTextureLightest}
            zIndex={21}
            height="90%"
            maxWidth="65%"
            bottomPos="10%"
            rightPos="0%"
            preserveAspectRatio="none"
            testId="furthest-tree-left"
          />
        </TreesLeftContainer>
        <TreesRightContainer testId="trees-right-container">
          <Tree3
            fillColor={colors.closestTree}
            zIndex={23}
            flipX={true}
            bottomPos="0%"
            rightPos="-40%"
            height="100%"
            maxWidth="80%"
            preserveAspectRatio="none"
            testId="tree-closest-right"
          />
          <TexturedTree1
            fillColor={colors.middleTree}
            strokeColor={colors.treeTextureMiddle}
            zIndex={22}
            flipX={true}
            height="95%"
            maxWidth="80%"
            bottomPos="5%"
            rightPos="-10%"
            preserveAspectRatio="none"
            testId="tree-middle-right"
          />
          <Tree2
            fillColor={colors.furthestTree}
            zIndex={21}
            flipX={true}
            height="90%"
            maxWidth="80%"
            bottomPos="10%"
            rightPos="10%"
            preserveAspectRatio="none"
            testId="tree-furthest-right"
          />
        </TreesRightContainer>
      </>
    </BackgroundContainer>
  );
}
