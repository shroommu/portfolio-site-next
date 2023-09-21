import "./global.css";

import Header from "./shared/Header.js";
import Footer from "./shared/Footer.js";
import Background from "./shared/Background.js";
import { ContentContainer, PageContainer } from "./shared/index.js";

export default function App({ Component, pageProps }) {
  return (
    <PageContainer>
      <Header />
      <Background />
      <ContentContainer>
        <Component {...pageProps} />
        <Footer />
      </ContentContainer>
    </PageContainer>
  );
}
