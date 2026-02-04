# MENTORIA Frontend

Next.js frontend for MENTORIA career guidance platform.

## Features

- ✅ Single-page responsive design
- ✅ Full CMS integration with Sanity
- ✅ Dynamic navbar from Sanity
- ✅ Image & logo support across all sections
- ✅ Static site generation (deployed via GitHub Pages)
- ✅ Mobile responsive layout
- ✅ Smooth anchor scrolling

## Setup

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mihika-sarwate/DC-John.git
   cd DC-John
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env.local
   NEXT_PUBLIC_SANITY_PROJECT_ID=6w0t9e7l
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Run development server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

5. Build static site:
   ```bash
   npm run build
   ```
   Output will be in the `out/` directory

## Deployment

### GitHub Pages Setup

The site is automatically built and deployed to the `gh-pages` branch via GitHub Actions when you push to the `main` branch.

**Required GitHub Secrets:**
1. Go to **Settings → Secrets and variables → Actions**
2. Add these secrets:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID (6w0t9e7l)
   - `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset (production)

**Enable GitHub Pages:**
1. Go to **Settings → Pages**
2. Set **Source** to: "Deploy from a branch"
3. Set **Branch** to: `gh-pages` (the workflow creates this automatically)
4. Leave the folder as `/ (root)`
5. The site will deploy automatically

Your live site will be at: `https://mihika-sarwate.github.io/DC-John/`

## Environment

- **CMS:** Sanity project `6w0t9e7l`
- **Dataset:** production
- **Framework:** Next.js 16.1.6 with Turbopack
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (static export)

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main home page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   └── ...
├── lib/
│   ├── sanity.ts            # Sanity client setup
│   └── queries.ts           # GROQ queries
├── public/                  # Static assets
└── package.json
```

## Key Features

### CMS-Driven Content
- All text, images, colors controlled from Sanity
- No hardcoded content
- Navbar, footer, sections all configurable

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Optimized images with Next.js Image component

### Performance
- Static site generation (ISR)
- Image optimization
- Minimal client-side JavaScript

## Troubleshooting

**404 on GitHub Pages?**
- Wait 1-2 minutes after pushing for the workflow to complete
- Check Actions tab to see if build succeeded
- Verify GitHub Pages source is set to "GitHub Actions"

**Build fails?**
- Ensure `.env.local` has correct Sanity credentials
- Check if Sanity project is accessible
- Review workflow logs in GitHub Actions

**Images not loading?**
- Verify Sanity image assets have proper alt text
- Check `.asset` reference exists in Sanity documents
- Images use Next.js Image component for optimization

## License

All rights reserved. Mentoria 2024

