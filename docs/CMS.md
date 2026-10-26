# MeshDefend CMS

MeshDefend uses a self-hosted Payload CMS. The admin is served from the same site at `/admin`; it uses the site's own users, database, media files, and page sections.

## Local setup

Use Node.js `22.23.4` or newer in the 22.x line, or `24.22.1` or newer in the 24.x line. Payload does not support the older Node 22 releases.

```bash
npm install
npm run cms:setup
npm run dev
```

Open `http://localhost:3000/admin`. When no CMS users exist, Payload shows the first-user setup screen. That first account becomes the super admin. Once it exists, public account creation is closed. A super admin can add editor accounts in the Users collection.

`cms:setup` creates local-only `PAYLOAD_SECRET` and `PAYLOAD_PREVIEW_SECRET` values in `.env.local`, creates the SQLite database under `data/`, and seeds the published Home page using the site's current copy and section order. Running it again fills newly added CMS fields while preserving saved copy, section order, and items removed in the admin. Do not commit `.env.local`, `data/`, or uploaded media.

## Editing pages

Open **Pages → Home** in the admin to edit the homepage. Its sections use a block editor: edit headings, descriptions, button labels and destinations, metrics, cards, audiences, logos and images; add supported sections; remove sections; or drag them into a new order. Open **Site → Site settings** to edit the shared header and footer, including logo uploads, header navigation and mega-menu links, calls to action, newsletter copy, footer link groups, legal links, and contact details. The first set of page blocks reuses the existing homepage React components, so content changes retain their responsive design and animations. Text, feature-grid, and image blocks provide flexible additions for new content.

The Hero block can use the existing dashboard image or a Media upload. Upload images in **Media**, then select them in the relevant image field. Pages also include a slug and browser title/description fields. The `/api/preview` route only enables draft mode when its secret matches and the requested page exists.

The CMS edits page content and composition within the components and block types supplied by the site. It does not expose arbitrary React, CSS, animation code, or unrestricted page-builder positioning; changing those templates still requires a code change. The footer newsletter currently shows a local confirmation only; connect an email/newsletter provider before using it to collect subscriptions.

The homepage is the first migrated page. Existing hand-built routes continue to use their current page components; new CMS pages can be created with a slug and are rendered by the CMS page route. Existing routes can be migrated in batches by moving their content into these blocks.

## Database and deployment

Local development uses SQLite at `data/payload.db`. Set `DATABASE_URL` to a PostgreSQL connection string to use PostgreSQL instead. Supply `PAYLOAD_SECRET` and `PAYLOAD_PREVIEW_SECRET` through the deployment's secret manager; use different random values for each environment.

Payload's local schema push is enabled by default. Set `PAYLOAD_DISABLE_SCHEMA_PUSH=1` only after the database schema has been migrated; use reviewed Payload migrations for later schema changes. Back up an existing SQLite database before applying schema changes.

PostgreSQL schema push is disabled in production. Generate and review a migration against the intended database, then apply it before starting the production site:

```bash
npm run cms:migrate:create
npm run cms:migrate
npm run cms:types
```

Commit the reviewed migration files and generated `src/payload-types.ts`. Keep `DATABASE_URL` pointed at the same database for migration generation and application. For media uploads, persist `public/media/` across deployments or move uploads to an object-storage adapter before using multiple stateless app instances.
