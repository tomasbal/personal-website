# Phase 1: Node.js & Package Updates - COMPLETED

## Changes

- `.nvmrc` updated to `22.14.0`
- `netlify.toml` updated: `NODE_VERSION = "22.14.0"`, `NPM_VERSION = "10.9.2"`
- `package.json`: engines `>=22.0.0`, all dependencies updated
- Added `@tsparticles/react` and `@tsparticles/slim`
- Migrated husky v4 to v9 (`.husky/pre-commit`)
- Added SSR null loader for `@tsparticles` in `gatsby-node.js`
- `yarn install` completed successfully
