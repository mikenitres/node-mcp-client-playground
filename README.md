# Astro + HTMX MCP Tool selection playground
[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)
_built using Astro Starter Kit: Minimal_

Example `.env` file can be found in the default folder named `env`. Fill it up and place it in the root folder before running the program

## 🚀 Project Structure

Inside this Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── api
│          └── mcpclient.ts
│          └── slack.ts
│          └── email.ts
│          └── increment.astro
│          └── decrement.astro
│       └── index.astro
│       └── send-email.astro
│       └── counter.astro
│   └── styles/
│       └── chat.css
│   └── utils/
│       └── tool-selector.ts
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun i`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |
