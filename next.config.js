const withImages = require("next-images");
module.exports = {
  compiler: {
    styledComponents: true,
  },
  distDir: "build",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
