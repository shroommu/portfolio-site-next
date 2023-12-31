import "./global.css";

import Header from "../components/shared/Header.js";
import Footer from "../components/shared/Footer.js";
import Background from "../components/shared/Background.js";
import ScrollToTop from "../components/shared/ScrollToTop";
import {
  ContentContainer,
  PageContainer,
  BackgroundGrass,
  Filler,
} from "../components/shared/index.js";
import FallingLeaves from "@/components/shared/FallingLeaves";

export default function App({ Component, pageProps }) {
  return (
    <PageContainer>
      <Header />
      <Background />
      <FallingLeaves />
      <ScrollToTop>
        <ContentContainer id="content-container">
          <Component {...pageProps} />
          <Filler />
          <Footer />
        </ContentContainer>
      </ScrollToTop>
      <BackgroundGrass />
    </PageContainer>
  );
}
