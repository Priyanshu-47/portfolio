import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

/* Restore client-route paths after GitHub Pages' 404.html redirect (see
   public/404.html): a direct visit to /portfolio/projects/x arrives as
   /portfolio/?/projects/x. This runs inside the deferred entry module —
   after ./assets/... has already resolved against the original URL — so
   entry assets resolve to /portfolio/assets/... at any route depth.
   No-op on normal visits (search[1] !== "/"). */
{
  const l = window.location
  if (l.search[1] === '/') {
    const decoded = l.search
      .slice(1)
      .split('&')
      .map((s) => s.replace(/~and~/g, '&'))
      .join('?')
    window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
