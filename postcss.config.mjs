// FILE: postcss.config.mjs
// PURPOSE: PostCSS config for Tailwind v4 — uses @tailwindcss/postcss plugin
//          Replaces the old postcss.config.js that referenced tailwindcss + autoprefixer

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config