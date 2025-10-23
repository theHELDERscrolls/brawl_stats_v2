# Contributing to Brawl Stats v2

Thank you for your interest in contributing to **Brawl Stats v2**! 🙌

This repository contains two main modules:

- `frontend/` — App built with React + Vite + TypeScript.
- `api-proxy-server/` — Proxy built with Node + Express + TypeScript.

Please read the following guidelines carefully before opening an _issue_ or a _pull request_.

---

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Recommended Workflow](#recommended-workflow)
- [Useful Scripts](#useful-scripts)
- [Commit Conventions](#commit-conventions)
- [Pull Request Checklist](#pull-request-checklist)
- [Reporting Bugs and Requesting Features](#reporting-bugs-and-requesting-features)
- [Minimum Environment Variables](#minimum-environment-variables)
- [Security](#security)
- [Contact and Support](#contact-and-support)

---

## How to Contribute

1. _Fork_ the repository and clone your fork.
2. Create a descriptive branch:
   ```bash
   git checkout -b feat/<short-description>
   # or
   git checkout -b fix/<short-description>
   ```
3. Make small, atomic commits. Follow the [Commit Conventions](#commit-conventions).
4. Open a Pull Request against `main` when your change is ready.

---

## Recommended Workflow

- Work on branches prefixed with `feat/`, `fix/`, `chore/`, `docs/`, etc.
- Keep your branch up to date with `main` before opening a PR:
  ```bash
  git fetch origin
  git rebase origin/main
  ```
- If you add changes that affect the API (endpoints, types), document them in `docs/api/` or in `api-proxy-server/README.md`.

---

## Useful Scripts

**Frontend**

```bash
cd frontend
npm install
npm run dev     # development (Vite)
npm run build   # production build
npm run lint    # lint with ESLint
```

**Backend (api-proxy-server)**

```bash
cd api-proxy-server
npm install
npm run dev     # build + node dist/index.js (as defined in package.json)
npm run build
```

> Note: if your environment uses a specific `NODE_VERSION`, indicate it in `.nvmrc` or in the documentation. If you’d like, we can include it.

---

## Commit Conventions

We follow **Conventional Commits**. Examples:

- `feat(frontend): add PlayerModal component`
- `fix(api): handle 429 errors from /players endpoint`
- `docs: update CONTRIBUTING.md`

This makes changelogs and reviews much easier.

---

## Pull Request Checklist

Before requesting a review, please make sure that:

- [ ] The code compiles and the build passes (`npm run build` when applicable).
- [ ] You have run `npm run lint` in the affected packages.
- [ ] Relevant documentation has been updated (`docs/` or `README.md`).
- [ ] If API types or contracts were changed, an updated request/response example is included.
- [ ] The PR has a clear description: what problem it solves, screenshots if applicable, and steps to test it.

---

## Reporting Bugs and Requesting Features

- When **reporting a bug**, include:
  - A clear description.
  - Steps to reproduce.
  - Relevant logs or errors.
  - Version/commit used.
- To **request a feature**, open an _issue_ describing the idea, use cases, and possible design.

---

## Minimum Environment Variables (example)

In `api-proxy-server`:

```env
BS_API_KEY=your_brawl_stars_token
```

> 🔑 To learn how to obtain your `BS_API_KEY` from the official Brawl Stars API, check  
> [docs/setup/environment.md](./docs/setup/environment.md), where a step-by-step guide explains how to generate and configure your developer token.

In `frontend` (if applicable):

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

> Do not upload your tokens to the repository. Use a `.env` file and add it to `.gitignore`.

---

## Security

- If you find a vulnerability or exposed credentials, **do not** publish it in a public issue. Contact the maintainer privately:
  - Email: manuhelderruiz@gmail.com
  - Discord: heldersito
  - Other collaborators
- Never commit keys or secrets.

---

## Acknowledgments and Code of Conduct

- Please read `CODE_OF_CONDUCT.md` before contributing.
- By contributing, you agree that your changes will be released under the project’s license.

---

## Questions / Support

Open an issue labeled `question` or `help wanted`. If you need more direct communication, let us know your preferred channel (e.g., Slack, Discord, email).

---

Thank you! Your help keeps this project alive. ❤️‍🔥
