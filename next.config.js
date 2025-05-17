/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set up a rule to ignore .md files
  webpack: (config) => {
    // Add a rule to ignore .md files
    config.module.rules.push({
      test: /\.md$/,
      use: 'ignore-loader'
    });

    return config;
  }
};

module.exports = nextConfig;
