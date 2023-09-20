import React from "react";
import ReactDOM from "react-dom/client";
// import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";

import Art from "./art/index.js";
import Blog from "./blog/index.js";
import Code from "./code/index.js";
import Home from "./index.js";
import Contact from "./contact/index.js";

import ScrollToTop from "./shared/ScrollToTop.js";

import Header from "./shared/Header.js";
import Footer from "./shared/Footer.js";
import Background from "./shared/Background.js";

// import "./global.css";
import { ContentContainer, PageContainer } from "./shared/index.js";
// import useBlogRoutes from "./components/blog/routes.js";
// import BlogPost from "./components/blog/BlogPost.js";

// export default function RootLayout({ children }) {
//   // const location = useLocation();
//   // const blogRoutes = useBlogRoutes();

//   return (
//     <PageContainer>
//       <Header />
//       {/* <Header location={location} /> */}
//       <Background />
//       <ContentContainer test-id="content-container" id="content-container">
//         {children}
//         {/* <Routes>
//               <Route path="/" index element={<Home />} />
//               <Route path="/code/" element={<Code />} />
//               <Route path="/art/" element={<Art />} />
//               <Route path="/blog/" element={<Blog />} />
//               <Route
//                 path="/blog/post/"
//                 element={<BlogPost />}
//                 //children={blogRoutes}
//               />
//               <Route path="/contact/" element={<Contact />} />
//             </Routes> */}
//         <Footer />
//       </ContentContainer>
//     </PageContainer>
//   );
// }

export default function RootLayout({ children }) {
  return (
    <PageContainer>
      <Header />
      {/* <Background /> */}
      <ContentContainer>
        {children}
        <Footer />
      </ContentContainer>
    </PageContainer>
  );
}
