# Deploying this Portfolio

The production build lives in `E:\Portfolio\dist\`. It's a pure static site
(5 files, ~400 KB) with **relative asset paths**, so it works under any
subpath — a GitHub Pages repo, your own domain, Netlify, anywhere.

You have **no local Git** on this machine, so the deployment path is the
browser — you don't need to install anything. Pick **Option A** (GitHub
Pages) or **Option B** (Netlify Drop). Both take ~2 minutes.

> The `base: './'` in `vite.config.ts` is what makes this work: every asset
> link in `dist/index.html` is relative (`./assets/...`), so it resolves
> correctly no matter what URL hosts it.

---

## Option A — GitHub Pages (browser upload, no Git)

### 1. Create the repository
1. Go to **github.com** and sign in.
2. Click **`+`** (top-right) → **New repository**.
3. **Repository name** — two choices:
   - `username.github.io` (exactly your GitHub username, e.g. `Priyanshu-47.github.io`)
     → hosts at `https://Priyanshu-47.github.io/`
   - any other name, e.g. `portfolio` → hosts at
     `https://Priyanshu-47.github.io/portfolio/`
4. Set it **Public**. **Do NOT** check "Add a README" / ".gitignore" / "license" —
   leave everything else empty so the upload lands clean.
5. Click **Create repository**.

### 2. Upload the built files
1. On the empty repo page, click **`Add file`** (top-right) → **Upload files**.
2. Open `E:\Portfolio\dist` in File Explorer.
3. Select **everything inside** the `dist` folder — `index.html`,
   `favicon.svg`, `resume.pdf`, and the `assets` folder — and drag them into
   the browser's upload box.
   ⚠️ Don't drag the `dist` folder itself — only its contents.
4. Click **Commit changes** (the default commit message is fine).

### 3. Turn on Pages
1. In the repo, go to **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. **Branch**: `main` · **Folder**: `/ (root)` → **Save**.
4. Wait **1–2 minutes** (the first build takes a little longer).

### 4. Visit your site
- Repo `username.github.io` → `https://<username>.github.io/`
- Repo `portfolio` → `https://<username>.github.io/portfolio/`

Every future update = re-run `npm run build`, then re-upload the changed
files in `dist` the same way.

---

## Option B — Netlify Drop (zero-setup, instant live URL)

The simplest option of all — no repo, no settings, just drag and drop:

1. Go to **https://app.netlify.com/drop** (sign in with email/GitHub/Google).
2. Drag the **`dist` folder itself** into the browser page.
3. Your site is live within seconds at a random `https://<random-name>.netlify.app` URL.
4. To rename it: **Site configuration** → **Site details** → **Change site name**.
5. Netlify gives you a shareable URL instantly. You can connect a custom
   domain later in **Domain management**.

> Netlify Drop sites are free and stay up indefinitely. This is the fastest
> way to get a recruiter-facing link today.

---

## Future: one-command deploys (once you install Git)

When you install Git on this machine, `npm run deploy` does everything —
builds, then pushes `dist/` to the `gh-pages` branch of your repo via the
`gh-pages` helper (auto-installed by `npx`):

```bash
npm run deploy
```

That requires:
- Git installed and on PATH (`winget install --id Git.Git`)
- You've set the remote:
  ```bash
  git init
  git remote add origin https://github.com/<username>/<repo>.git
  ```

Until then, Options A and B above need nothing but a browser.
