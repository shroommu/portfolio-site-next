import styled from "styled-components";
import { useCallback } from "react";
import UnstyledParticles from "react-particles";
import { loadFull } from "tsparticles";
import { colors } from "../constants";
import { device } from "@/constants";

const options = {
  name: "Falling Leaves",
  particles: {
    color: colors.darkestBlue,
    move: {
      enable: true,
      speed: { min: 2, max: 4 },
      direction: "bottom",
      straight: true,
    },
    life: {
      count: 80,
      time: {
        value: {
          min: 6,
          max: 8,
        },
      },
    },
    wobble: {
      enable: true,
      distance: 10,
      speed: 10,
    },
    number: {
      value: 40,
      density: {
        enable: true,
      },
    },
    opacity: {
      value: 1,
      animation: {
        enable: true,
        maximumValue: 1,
        minimumValue: 0.1,
        sync: false,
        startValue: "max",
        destroy: "min",
      },
    },
    rotate: {
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
      direction: "random",
      value: { min: 0, max: 360 },
    },
    shape: {
      options: {
        image: {
          name: "leaf 1",
        },
      },
      type: "image",
    },
    size: {
      value: { min: 15, max: 25 },
    },
  },
  preload: [
    {
      name: "leaf 1",
      src: "/assets/svg/leaf1.svg",
      width: 32,
      height: 32,
      replaceColor: true,
    },
  ],
  background: {
    color: "",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
  },
};

const Particles = styled(UnstyledParticles)`
  z-index: 3;

  @media ${device.tablet} {
    display: none;
  }
`;

export default function FallingLeaves() {
  const particlesInit = useCallback((engine) => {
    loadFull(engine);
  }, []);

  return (
    <Particles id="fallingLeaves" options={options} init={particlesInit} />
  );
}
