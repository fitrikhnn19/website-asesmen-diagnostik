const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  dialect: 'sqlite',
  schema: './drizzle/schema.js',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:data/sidag.db',
  },
});
