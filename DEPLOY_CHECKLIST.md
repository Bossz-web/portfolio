# Pre-Deployment Checklist

All CV data is now live in the codebase. Before deploying to Vercel, complete these final steps:

## 1. Verify Build Locally
```bash
cd "C:\Users\User\Desktop\PP\portfolio"
npm run build
```
If successful, you'll see "Compiled successfully" and a `.next` folder. Any errors will show line numbers — fix those first.

## 2. Copy Your CV to Public Folder
```bash
# From project root:
copy "path\to\Kolawole_Inioluwa_CV.pdf" "public\resume.pdf"
```
This makes the Resume button download your actual CV instead of returning 404.

## 3. Replace Placeholder Images (CRITICAL for conversion)
Current placeholder images hurt credibility. Replace these in `public/images/`:

- **Project screenshots** (3 files):
  - `projects/fintech-app.png` — screenshot of the MSME Labs payments app
  - `projects/livesense.png` — screenshot of LiveSense liveness detection in action  
  - `projects/portfolio.png` — screenshot of this portfolio site

  Then update `content/projects.js`:
  ```js
  image: "/images/projects/fintech-app.png",  // line 19
  image: "/images/projects/livesense.png",     // line 43
  image: "/images/projects/portfolio.png",     // line 68
  ```

- **Your headshot** (`Lolade_PP.png`): If the current file is a placeholder, replace it with a clean professional photo. Recruiters judge fast.

## 4. Update Site Config for Production
Edit `config/site.js`:
- Change `url: "https://yourname.dev"` to your real Vercel URL (e.g. `https://lolade-kolawole.vercel.app`)
- This fixes Open Graph previews, the sitemap, and canonical URLs

## 5. Fix GitHub Repo Links (if repos are public)
In `content/projects.js`, lines 46 and 71 point to your profile, not the repos:
```js
repoUrl: "https://github.com/Bossz-web/livesense",     // actual repo URL
repoUrl: "https://github.com/Bossz-web/portfolio",    // actual repo URL
```

## 6. Deploy to Vercel
```bash
# If you don't have Vercel CLI:
npm i -g vercel

# From project root:
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: portfolio (or your choice)
# - Deploy? Yes

# After it finishes, you get a live URL.
# To deploy again after changes:
vercel --prod
```

## What's Already Done ✓
- [x] All placeholder content (Alex Chen, Northwind Labs, etc.) replaced with your real CV data
- [x] Skills updated with 7 categories including "Currently Learning"  
- [x] Experience: MSME Labs + LiveSense from CV
- [x] Education: University of Ilorin, B.Sc. Agriculture
- [x] Projects: Fintech app, LiveSense, this portfolio
- [x] Testimonials hidden (empty array)
- [x] Blog hidden (`features.blog: false`)
- [x] Name: Lolade Kolawole
- [x] Location: Lagos, Nigeria
- [x] Socials: GitHub (Bossz-web), X (@Ololade_dev), Email
- [x] Monogram: LK in navbar, footer, OG image, favicon
- [x] Availability dot: green (emerald-500)
- [x] Manifest updated
- [x] LinkedIn swapped for X

## Nice-to-Haves (Post-Launch)
- Add Vercel Analytics (free up to 100k events/month) — drops into `app/layout.jsx`
- Set up a custom domain if you have one
- Monitor Core Web Vitals in Vercel dashboard after deploy

---

Once steps 1–6 are done, the site is production-ready. Real screenshots are the biggest lever — they turn "another portfolio" into proof you ship.
