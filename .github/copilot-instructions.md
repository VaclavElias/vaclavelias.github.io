# GitHub Copilot Custom Instructions

This document provides specific guidance for GitHub Copilot when working on this repository. It serves as context for understanding the project structure, development workflow, and best practices.

## Project Overview
This repository contains a .NET 9 web application and a static site/blog built with Eleventy. The project includes:
- Minimal C# web app code (see `Program.cs`)
- Markdown-based blog posts and documentation
- GitHub Actions workflows for static site generation and deployment
- Typical structure for a personal or technical blog

## Copilot Guidance
- Prefer latest C# and .NET 9 features for backend code.
- For static site/blog content, use Markdown and follow the style of existing posts in the `posts/` directory.
- When editing or creating workflows, follow the conventions in `.github/workflows/` (YAML, Eleventy build steps, deployment to `gh-pages`).
- Keep code and content modular and easy to read.
- When adding new features, update or create documentation as needed.
- Use best practices for both C# and JavaScript/Node.js (for Eleventy).
- Respect the separation between backend code and static site content.

## Maintenance
- As the project evolves, **update this `copilot-instructions.md` file** with new instructions, conventions, or best practices to keep Copilot helpful and relevant.

For more details on Copilot custom instructions, see: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot