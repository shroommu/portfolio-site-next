module.exports = {
  output: "export",
  trailingSlash: true,
  distDir: "build",
  images: { unoptimized: true },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
