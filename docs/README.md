# Documentation Website

This directory contains the VitePress-powered documentation website for @mhkeller/utils.

## Overview

The documentation is automatically generated from JSDoc comments in the source code and organized into logical categories:

- **Array & Object Utils** - Functions for working with arrays, objects, and data structures
- **String Utils** - Functions for string manipulation and formatting  
- **Number Utils** - Functions for number formatting and mathematical operations
- **Time & Progress** - Functions for time handling, delays, and progress tracking
- **File & Data** - Functions for reading, writing, and processing data files
- **General Utilities** - Miscellaneous utility functions
- **Database Functions** - PostgreSQL utilities and helpers
- **SQLite Functions** - SQLite database utilities
- **Web Scraping** - Browser automation and screenshot tools

## Development

### Prerequisites

Make sure you have the required dependencies installed:

```bash
npm install
```

### Local Development

Start the development server:

```bash
npm run docs:dev
```

The documentation will be available at `http://localhost:5173/utils/` (note: this is a local development URL)

### Building

Generate the documentation and build the static site:

```bash
npm run docs:build
```

The built site will be in `docs/.vitepress/dist/`

### Preview Built Site

Preview the built documentation:

```bash
npm run docs:preview
```

## Content Management

### Automatic Generation

The API documentation is partially generated from JSDoc comments using the `docs/generate-docs.js` script:

```bash
npm run docs:generate
```

### Manual Editing

While the base content is generated from JSDoc, the API documentation pages can be manually edited to add:

- Better examples
- Usage patterns
- Additional context
- Cross-references

### Adding New Functions

When adding new functions to the library:

1. Add comprehensive JSDoc comments to the source file
2. Update the categories in `docs/generate-docs.js` if needed
3. Run `npm run docs:generate` to update the documentation
4. Edit the generated markdown files to add examples and context

## File Structure

```
docs/
├── .vitepress/
│   └── config.js          # VitePress configuration
├── api/                   # API reference pages
│   ├── index.md
│   ├── array-object.md
│   ├── string.md
│   ├── number.md
│   ├── time-progress.md
│   ├── file-data.md
│   ├── utilities.md
│   ├── database.md
│   ├── sqlite.md
│   └── scraping.md
├── index.md               # Home page
├── installation.md       # Installation guide
└── generate-docs.js       # Documentation generation script
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch via the `.github/workflows/docs.yml` workflow.

## Customization

### Theme

The documentation uses the default VitePress theme. To customize:

1. Edit `docs/.vitepress/config.js` for configuration
2. Add custom CSS in `docs/.vitepress/theme/style.css`
3. Override components in `docs/.vitepress/theme/index.js`

### Navigation

Update the sidebar navigation in `docs/.vitepress/config.js` in the `themeConfig.sidebar` section.

### Styling

The documentation uses VitePress's default theme with minimal customization. The color scheme and layout are optimized for code documentation.

## Best Practices

1. **Keep JSDoc comments up to date** - The documentation quality depends on good JSDoc comments
2. **Add practical examples** - Include real-world usage examples for each function
3. **Cross-reference related functions** - Link to related utilities when relevant
4. **Test examples** - Ensure all code examples actually work
5. **Use consistent formatting** - Follow the established patterns for parameter documentation
