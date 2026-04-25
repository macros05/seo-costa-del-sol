# Cloudflare Pages — Deploy `seocostadelsol.com`

End-to-end recipe to ship this React/Vite landing page to Cloudflare Pages and
connect the apex domain `seocostadelsol.com` (+ `www.`).

---

## 0. Prerequisites

- The repo is pushed to GitHub: `https://github.com/macros05/seo-costa-del-sol`.
- A Cloudflare account with the domain `seocostadelsol.com` already added (or
  you're prepared to add it). The DNS is going to live on Cloudflare.
- The Hetzner VPS that runs `ProyectoSEOBOT` is reachable on a public IP
  (or a hostname that has a valid HTTPS certificate). You will paste that IP
  into `public/_redirects` before pushing.

---

## 1. Wire the API proxy IP

Open `public/_redirects` and replace `YOUR_HETZNER_IP` with the actual public
endpoint of the FastAPI backend:

```
/api/*  https://178.156.X.Y/api/:splat  200
/*      /index.html                      200
```

Notes:
- HTTPS is **required** by Cloudflare proxy rules. If your VPS only serves
  plain HTTP on port 80, terminate TLS on Nginx first (Let's Encrypt /
  Certbot — see `ProyectoSEOBOT/deploy/`).
- Alternatively use a hostname like `api.seocostadelsol.com` pointing
  (DNS-only, gray cloud) to the Hetzner IP. Cleaner and survives IP changes.

Commit and push the change.

---

## 2. Create the Pages project

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize Cloudflare to read the GitHub account and pick
   `macros05/seo-costa-del-sol`.
3. Production branch: `main`.
4. **Build settings**:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: *(leave empty)*
   - Environment variables: *(none required for the static build)*
   - Node version: 20 (set `NODE_VERSION=20` if the auto-detected default
     is older).
5. Click **Save and Deploy**. The first deploy will read your `_redirects`
   and your `dist/` output.

Subsequent pushes to `main` redeploy automatically.

---

## 3. Connect `seocostadelsol.com`

1. Pages project → **Custom domains → Set up a custom domain**.
2. Enter `seocostadelsol.com`. Cloudflare will:
   - Detect the zone (since it's already on your account) and add a CNAME
     flattening record from the apex to `<project>.pages.dev`.
   - Provision an Edge SSL certificate (free, ~minutes).
3. Repeat for `www.seocostadelsol.com` and add a redirect rule
   `www → apex` (or apex → www, your call) under **Rules → Redirect Rules**.

Verify:

```bash
curl -I https://seocostadelsol.com
# expect: HTTP/2 200, server: cloudflare
```

---

## 4. Smoke test the API proxy

Once DNS has propagated:

```bash
# Should hit your Hetzner FastAPI
curl https://seocostadelsol.com/api/health
```

If this returns `404` or `Cloudflare Tunnel`-style errors, the most common
causes are:

- `_redirects` still points to `YOUR_HETZNER_IP` (rebuild after editing).
- The VPS isn't reachable on HTTPS. Cloudflare can't proxy `http://`.
- The FastAPI app's CORS rejects the new origin — add
  `https://seocostadelsol.com` to `settings.cors_origins`.

---

## 5. After the first successful deploy

- Lock the project to **Production-only deployments** if you want previews
  to require a button press.
- Add `seo@marcosmorales.dev` as a notification address under
  **Pages → Settings → Notifications** so failed builds reach you.
- Enable **Always Use HTTPS** and **Automatic HTTPS Rewrites** under
  the zone-level SSL/TLS settings.

---

## Updating the API endpoint later

If the VPS IP changes, the easiest fix is:

1. Edit `public/_redirects`.
2. `git commit -am "chore: update API proxy IP"` && `git push`.
3. Cloudflare Pages auto-rebuilds and redeploys in ~30 seconds.

If you switched to a hostname (`api.seocostadelsol.com`), update the
DNS record in Cloudflare instead — no code change needed.
