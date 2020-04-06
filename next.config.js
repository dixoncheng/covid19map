const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

module.exports = withOptimizedImages(
  withPWA({
    pwa: {
      dest: "public",
      disable: process.env.ENV === "development"
    }
  })
);
