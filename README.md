# Hugo Website

This website is built with [Hugo](https://gohugo.io/), a fast and flexible static site generator.

## Features

- Basic Hugo theme with responsive layout
- Team page for showcasing team members
- ASCII video player using JSONL format
- Horse animation demo (`/horse_shrinked`)

## Getting Started

### Prerequisites

- Hugo Extended v0.155.0 or later

### Development

Start the Hugo development server:

```bash
hugo server -D
```

The site will be available at `http://localhost:1313/`

### Build

Build the site for production:

```bash
hugo
```

The built site will be in the `public/` directory.

## Project Structure

- `content/` - Markdown content files
  - `team/` - Team member pages
- `layouts/` - HTML templates
  - `_default/` - Default layout templates
  - `shortcodes/` - Reusable content snippets
- `static/` - Static assets (CSS, JS, images, videos)
  - `js/` - JavaScript files including ASCII video player
  - `horse_shrinked/` - ASCII video frames
- `hugo.toml` - Hugo configuration

## ASCII Video Player

The ASCII video player is integrated as a Hugo shortcode. Use it in your markdown files:

```
{{< ascii-video path="/horse_shrinked" >}}
```

### Shortcode Parameters

- `path` - Path to the frames directory (required)
- `gzip` - Use gzip compression (default: "true")
- `invert` - Invert colors mode: 0 (none), 1 (light mode), 2 (dark mode)
