# Dummy GitHub Pages Site

This small static site is meant to help you test GitHub Pages with a custom domain.

## Files
- `index.html` — main page
- `styles.css` — simple styles
- `404.html` — optional not-found page
- `CNAME` — (sample file included as CNAME.sample) If you want GitHub to serve a custom domain, add a file named `CNAME` with your domain (e.g. `www.example.com`) at the repo root.

## How to use
1. Create a GitHub repository (public or private) and push these files to the `main` branch.
2. In the repo Settings → Pages, set the Source to `main` (root) or `gh-pages`.
3. Add your custom domain in Settings → Pages or commit a `CNAME` file with your domain.
4. Update DNS records with your domain registrar (see instructions provided separately).
5. Wait for DNS propagation then enable "Enforce HTTPS" in Pages settings.
