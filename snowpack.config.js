// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  exclude: [
    '.git/**/*', '**/node_modules/**/*', 'package.json', 'package-lock.json', 'readme.md', 'snowpack.config.js', '.gitignore', 
    'scripts/**/*', '**/*.less', 'gh-pages/**/*',
    'server/**/*', 'etc/**/*',
  ],
  optimize: {
    // bundle: true,
    minify: true,
  },
  mount: {
    /* ... */
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    'external': ['fs'],
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: 'gh-pages',
    watch: true,
    htmlFragments: true,
  },
};
