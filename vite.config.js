

export default {
  plugins: [
    // Add the JSON plugin
    {
      name: 'vite-plugin-json',
      transform(src, id) {
        if (id.endsWith('.json')) {
          return `export default ${src}`;
        }
      },
    },
  ],
};
