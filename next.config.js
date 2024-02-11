module.exports = {
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.csv$/,
      use: [
        {
          loader: "csv-loader",
          options: {
            emitFile: true,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  cleanupIds: false,
                  collapseGroups: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
