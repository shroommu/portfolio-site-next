const size = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1260px",
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
  PROJECTS: "/projects/",
  CONTACT: "/contact/",
};

export const locationsWithLabels = {
  INDEX: { path: locations.INDEX, label: "Home" },
  ART: { path: locations.ART, label: "Art" },
  BLOG: { path: locations.BLOG, label: "Blog" },
  PROJECTS: { path: locations.PROJECTS, label: "Projects" },
  CONTACT: { path: locations.CONTACT, label: "Contact" },
};
