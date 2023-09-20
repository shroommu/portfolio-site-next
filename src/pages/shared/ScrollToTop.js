import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToTop({ children }) {
  const { pathname } = useRouter();

  useEffect(() => {
    document.getElementById("content-container").scroll(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
