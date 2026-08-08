# Deploying this Portfolio

**Live at https://priyanshu-47.github.io/portfolio/** — fully automated.

The repo `github.com/Priyanshu-47/portfolio` holds the **source**. A GitHub
Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to
GitHub Pages automatically on **every push to `main`** — nothing manual.

- Source path: `main` branch → `vite build` → `dist/` → `actions/deploy-pages`
- `base: './'` in `vite.config.ts` makes all asset paths relative, so the
  site works under the `/portfolio/` subpath.

---

## Updating the site

1. Make your changes in `src/`.
2. Commit and push:
   ```bash
   git add -A
   git commit -m "update: <what changed>"
   git push
   ```
3. GitHub Actions builds and deploys in ~40s.
4. Check the run: `gh run watch` (from `E:\Portfolio`).

To preview locally first: `npm run dev` (http://localhost:5173) or
`npm run build && npm run preview`.

---

## Local setup (already done on this machine)

- **Git** installed via winget (`Git.Git`)
- **GitHub CLI** installed via winget (`GitHub.cli`), logged in as
  `Priyanshu-47` with `repo`, `workflow`, `read:org`, `gist` scopes
- `gh auth setup-git` configures git to authenticate with the token
- Local git identity: `Priyanshu Lodha` / GitHub noreply email
- Origin remote: `https://github.com/Priyanshu-47/portfolio.git`

---

## What the live profile data shows (About section)

The About section's **GitHub** and **Open Source** cards are backed by the
real profile `github.com/Priyanshu-47`, fetched 2026-08-08:

- 27 public repositories (Python, C#, TypeScript, SQL, JS, Dart, more)
- Active: daily NeetCode DSA practice (`neetcode-submissions`), plus a
  certification hub and Hexaware/ARTH training projects

These live values live in `src/data/resume.ts` → `profile.githubStats` —
update the numbers there if the profile changes.

---

## Troubleshooting

- **Deploy failed?** `gh run list` → `gh run view <id> --log-failed`
- **Wrong URL?** Pages is set to `build_type: workflow` — change via
  repo → Settings → Pages → Source → **Deploy from a branch**.
- **No `workflow` scope?** `gh auth refresh -h github.com -s workflow`
