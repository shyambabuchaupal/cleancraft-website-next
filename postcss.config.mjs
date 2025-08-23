// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.config.ts",
    },
  },
};

export default config;
