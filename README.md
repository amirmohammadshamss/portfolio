# Amir Mohammad Shams — Developer Portfolio

A static Next.js App Router portfolio and a dedicated 16:9 PDF presentation, maintained from the same typed project data. No database, CMS, API routes, or runtime server is needed on the host.

## Run locally

Requires Node.js 22 or newer and npm.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open http://localhost:3000. `npm run dev` prepares the PDF download before starting: it reuses the latest export when present, or runs the full build and PDF generation once when no PDF exists. Preview the presentation at `/portfolio/print/`. After changing content, run `npm run build:portfolio` to refresh the downloadable PDF.

## Build and export

```sh
npm run typecheck
npm run lint
npm run build:portfolio
npm run verify
```

`build:portfolio` runs the Next.js static build first, then serves `out/` temporarily on loopback, launches Chromium, waits for fonts and images, checks page overflow, renders the presentation, and writes metadata, and synchronizes the same PDF to `public/portfolio.pdf` for the development server. It closes the browser and server afterward. `out/` contains the complete deployable website **and `portfolio.pdf`**. The PDF has landscape 1440 × 810 CSS pixel pages, searchable text, embedded fonts and screenshots, page numbers, and clickable links when configured.

- `npm run build`: website static export only
- `npm run generate:pdf`: regenerate the PDF from the existing static export
- `npm run verify`: check static routes, local links, images, gallery opening and Escape dismissal, desktop/tablet/mobile overflow, PDF dimensions, page count, and extracted text; saves website screenshots to `artifacts/`

The initial presentation is 13 pages: cover, introduction, two pages per project, and a thank-you page. Screen-text transcripts are retained as editable source data and are not displayed on the website or included in the PDF. Set `pdfLayout: "compact"` for a one-page project. Long descriptions or unusually large galleries should be edited to fit the presentation; export fails on page overflow rather than silently clipping a page.

## Edit content

- `src/data/profile.ts`: name, introduction, and contact destinations. Email, GitHub, LinkedIn, and website are intentionally blank; add your actual details before sending to recruiters.
- `src/data/reference-content.ts`: original introduction and project paragraphs, plus readable screen-text transcriptions. Original paragraphs are shared by the website and PDF; screen-text transcriptions are retained as source data only. Demo clinic contacts and accounts are screenshot content, not personal contact information. Garbled OCR fragments are left in the source images rather than introduced as text.
- `src/data/projects.ts`: project descriptions, categories, stack, role, responsibilities, technical implementation, challenges, solutions, outcomes, links, order, visibility, and PDF options.
- `src/types/portfolio.ts`: shared `Project` and `Screenshot` types.
- `public/images/projects/`: source image assets.
- `src/data/screenshots.json`: dimensions and paths for the extracted reference screenshots. This is an asset manifest; all project copy lives in `projects.ts`.

To add a project, add an object to the exported `projects` array with its own `coverImage` and `screenshots`. You can append an object after the initial seed mapping or replace that mapping with a plain array. New projects need no page or component changes. Screenshots accept `device: "mobile"`, `"browser"`, or `"none"`, original width/height, alt text, and caption. Keep source aspect ratios. Browser and mobile frames are reusable, and the gallery opens full resolution images in a keyboard accessible native dialog.

`status: "hidden"` excludes a project from routes and exports; `"archived"` keeps a case study accessible in More work; `featured` controls the homepage presentation; `includeInPdf` controls PDF inclusion; `order` controls display order. An archived project can remain in the PDF if explicitly included.

Rebuild after editing content. The website and presentation read the same objects. Add only verified outcomes and responsibilities; unsupported fields currently appear as editable documentation notes on the website and are omitted from the presentation.

## Reference assets

The supplied 13-page original PDF is flattened: every page is one raster image with no selectable text or independently extractable product screenshots. Twenty screen regions were extracted at high resolution: fifteen gallery screens plus the five original description-page screens. Description-page phone images retain the original source page edge; any clipping already present in the source is preserved. The site does not use full original pages as backgrounds. Reference copy was reviewed visually. turLister's documented stack includes Ionic, Angular, TypeScript, REST APIs, and MVC. Other stacks, personal roles, metrics, and project links have not been invented. The original PDF and external source folders are not required to build this repository.

## Design and implementation

The website follows the original PDF’s presentation sequence: a cyan Mobility Projects cover, a white introduction, paired project descriptions and blue three-screen galleries, and a white thank-you page. `src/components/presentation.tsx` shares these sections with the print route; the web layout adapts to small screens while print utilities lock the landscape dimensions.

Server components render the home, case studies, and print presentation. Only the native dialog gallery needs client state. Local Inter variable fonts avoid build-time font requests. All styling uses Tailwind CSS utilities; `src/components/styles.ts` holds shared utility lists. Project detail routes use `generateStaticParams` with dynamic parameters disabled. Images are unoptimized for static hosting.

## Static deployment

Upload the **contents of `out/`** to any static host. Serve directories using `index.html`; configure `404.html` as your error page. No Node.js process is required after deployment. Do not deploy only `.next/`.

For a GitHub Pages repository at `https://username.github.io/portfolio`, set both values **during build**:

```sh
NEXT_PUBLIC_SITE_URL=https://username.github.io NEXT_PUBLIC_BASE_PATH=/portfolio npm run build:portfolio
NEXT_PUBLIC_BASE_PATH=/portfolio npm run verify
```

For a custom domain, omit the base path and set `NEXT_PUBLIC_SITE_URL=https://your-domain.example`. The origin setting enables absolute sitemap URLs. No fake production origin is supplied by default. Root-relative assets and PDF links use the configured base path.

A ready-to-use Pages workflow is included in `.github/workflows/deploy.yml`. Enable GitHub Pages with GitHub Actions as the source. Set repository variable `SITE_URL` to your origin and `BASE_PATH` to `/repository-name` (empty for a user site or custom domain). Chromium is needed in the build environment, not on the hosting provider at runtime.

## Dependency audit note

The installed ESLint/Next lint toolchain currently reports a transitive `braces` stack-exhaustion advisory (GHSA-vfj7-8cjw-p6xm). npm lists 3.0.3 as the latest braces release and suggests an incompatible Next lint downgrade rather than a compatible patch. This affects development lint glob processing, not the generated static website. Recheck `npm audit` when updating dependencies. Versions are pinned and `package-lock.json` is included.
