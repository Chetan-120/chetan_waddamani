# Chetan Waddamani Portfolio

Premium dark-mode portfolio website built with Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

The project is ready for Vercel deployment. Replace `public/resume.pdf` with the final resume and update the social links in `lib/content.ts` when the final URLs are available.

## Updating Images

Personal photo:
- Add your photo to `public/`, for example `public/chetan-photo.jpg`.
- In `components/portfolio-experience.tsx`, find `src="/profile-placeholder.svg"` and change it to `src="/chetan-photo.jpg"`.
- A vertical 4:5 image works best.

Creative / short film thumbnails:
- Add thumbnails to `public/`, for example `public/short-film-thumbnail.jpg`.
- In `lib/content.ts`, update each `thumbnail` value inside `creativeWork`.
- Example: `thumbnail: "/short-film-thumbnail.jpg"`.

Project links:
- In `lib/content.ts`, each project has `liveUrl` and `githubUrl`.
- Replace the placeholder Vercel URLs with your real deployment links.
- Replace `https://github.com/your-username/...` with your real repository links.
- The project card buttons automatically redirect to those links.

Resume:
- Replace `public/resume.pdf` with your final resume PDF.
