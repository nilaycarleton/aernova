# Aernova — Website

A production-grade Next.js website with interactive 3D model viewing for optimized DroneDeploy GLB exports.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** — [Download](https://nodejs.org)
- A package manager: `npm` (included with Node), `yarn`, or `pnpm`

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Adding Your DroneDeploy 3D Models

The website viewer expects one optimized `.glb` file per project. If DroneDeploy gives you
`OBJ + MTL + JPG` files, convert them to GLB first so the browser can load one compact model
instead of several large files.

Recommended web targets:
- Preview model: 5-15 MB if possible
- Texture size: 2048px or 4096px for most portfolio views
- Format: `.glb`
- Optional: keep a separate high-detail GLB only if you need it

### Step 1 — Convert to GLB

Use one of these workflows:

1. Blender
   - Import the DroneDeploy `.obj`.
   - Make sure the `.mtl` and texture images are in the same folder so materials load correctly.
   - Reduce texture size if the exported textures are very large, for example 8192px.
   - Export as `glTF 2.0`.
   - Choose `Format: glTF Binary (.glb)`.
   - Name the file `model.glb`.

2. Online or CLI converter
   - Convert the OBJ project to GLB.
   - Compress/simplify the model for web use.
   - Keep the final file name as `model.glb`.

### Step 2 — Organise your files

Place each project's files in the `public/models/` folder like this:

```
public/
  models/
    project-1/
      model.glb
    project-2/
      model.glb
```

Files in `public/` are served from the site root, so
`public/models/project-1/model.glb` becomes `/models/project-1/model.glb` in the code.

### Step 3 — Update the projects list

Open `components/Projects.tsx` and edit the `projects` array:

```typescript
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Your Project Title',
    category: 'Roofing Inspection',   // or "Construction Progress", "Aerial Measurement"
    location: 'North York, ON',
    date: '2024-03',                  // YYYY-MM format
    description: 'Describe what was captured and delivered...',
    tags: ['Roofing', 'GLB Viewer'],
    modelPath: '/models/project-1/model.glb',
    thumbnailColor: 'from-cyan/20 to-ink',  // Tailwind gradient classes
  },
  // Add more projects here...
];
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js App Router |
| Styling | Tailwind CSS |
| 3D Rendering | Three.js + React Three Fiber + Drei |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Bebas Neue + DM Mono + Barlow |

---

## 🌐 Deployment (Free)

### Option A — Vercel (Recommended, 1-click)

1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Click **Deploy** — Vercel auto-detects Next.js ✅

Your site will be live at `your-project.vercel.app` in ~2 minutes.

### Option B — Netlify

1. Run `npm run build` locally
2. Drag the `.next` folder to [netlify.com/drop](https://app.netlify.com/drop)

### Option C — GitHub Pages (with static export)

Add to `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  // ...rest of config
};
```
Then run `npm run build` — the `out/` folder can be deployed to GitHub Pages.

---

## 📧 Contact Form

The contact form uses Web3Forms and posts directly from `components/Contact.tsx`.
The current access key is stored in the component as `WEB3FORMS_ACCESS_KEY`.

To change the receiving inbox or form settings:

1. Go to [web3forms.com](https://web3forms.com).
2. Open the form attached to your access key.
3. Update the destination email and notification settings there.

For a private server-side email setup later, replace Web3Forms with a Next.js API route
using Resend or another transactional email service.

---

## 🎨 Customisation

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  cyan: '#00D4FF',   // ← Brand accent
  orange: '#FF6B1A', // ← Secondary accent
}
```

### Contact Details
Update in `components/Contact.tsx`:
- Email address
- Phone number
- LinkedIn URL

### Business Info
Update `app/layout.tsx` metadata for SEO.

---

## 📁 Project Structure

```
aernova-site/
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata
│   └── page.tsx            # Main page (assembles all sections)
├── components/
│   ├── Nav.tsx             # Sticky navigation
│   ├── Hero.tsx            # Landing hero with drone illustration
│   ├── Services.tsx        # Services grid (6 cards)
│   ├── Projects.tsx        # ← ADD YOUR MODELS HERE
│   ├── ModelViewer.tsx     # Three.js GLB viewer
│   ├── About.tsx           # Company info
│   ├── Contact.tsx         # Quote request form
│   └── Footer.tsx          # Footer
├── public/
│   └── models/             # ← PLACE YOUR GLB FILES HERE
├── styles/
│   └── globals.css         # Global styles + Google Fonts
├── tailwind.config.js
├── next.config.js
└── package.json
```
