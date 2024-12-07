const cssnano = require("cssnano");

module.exports = {
  style: {
    postcss: {
      plugins: [
        cssnano({
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
            },
          ],
        }),
      ],
    },
  },
};
