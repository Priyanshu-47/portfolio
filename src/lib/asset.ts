/* Prefix for files served from public/.
 *
 * The production build is deployed to GitHub Pages under the /portfolio/
 * subpath (see DEPLOY.md), so root-absolute paths like "/img/x.jpg" would
 * resolve to https://priyanshu-47.github.io/img/x.jpg and 404 — the files
 * actually live at /portfolio/img/x.jpg. In dev the app is served at "/"
 * so no prefix is needed.
 *
 * Same PROD switch as the router basename in App.tsx ("/portfolio").
 */
export const PUBLIC_BASE = import.meta.env.PROD ? "/portfolio" : "";

/** "/img/x.jpg" -> "/portfolio/img/x.jpg" in prod, unchanged in dev */
export function asset(path: string): string {
  return `${PUBLIC_BASE}${path}`;
}
