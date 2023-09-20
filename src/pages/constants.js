const size = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

export const locations = {
  INDEX: "/",
  ART: "/art/",
  BLOG: "/blog/",
  CODE: "/code/",
  CONTACT: "/contact/",
};

export const locationsWithLabels = {
  INDEX: { path: locations.INDEX, label: "Home" },
  ART: { path: locations.ART, label: "Art" },
  BLOG: { path: locations.BLOG, label: "Blog" },
  CODE: { path: locations.CODE, label: "Code" },
  CONTACT: { path: locations.CONTACT, label: "Contact" },
};
