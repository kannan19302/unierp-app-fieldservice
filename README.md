# unierp-app-fieldservice

UniERP **Field Service** industry app — lives outside the core monorepo and ships two artifacts:

- **`bundle/manifest.json`** — marketplace bundle (`runtime: declarative+service`), published to the UniERP marketplace. Install/uninstall is real-time; no core rebuild.
- **`src/`** — a standalone NestJS service with its **own database**. Core proxies `/api/v1/ext/field-service/*` to it through the extension gateway, attaching a signed tenant-context token per request (see `docs/EXTENSION_SERVICE_CONTRACT.md` in the core repo).

## Endpoints (behind the gateway)

`tickets`, `dispatches`, `checklists`, `preventative`, `dispatch/board`, `dispatch/assign`, `dispatch/:id/status`, `dispatch/sla`, `dispatch/preventive-maintenance` — all under `/api/v1/ext/field-service/` on core.

## Local development

```bash
npm install
npx prisma generate
# service DB on the shared dev Postgres (create once):
#   CREATE DATABASE unierp_fieldservice;
npx prisma migrate dev
EXT_SERVICE_JWT_SECRET=dev-ext-secret-change-me npm run dev   # listens on :4103
```

Or with core's dev network: `docker compose up -d` (joins the external `unierp` network).

Core needs `FIELD_SERVICE_SERVICE_URL=http://localhost:4103` (already the manifest default) and the same `EXT_SERVICE_JWT_SECRET`.

## Cutover from core

`CORE_DATABASE_URL=... DATABASE_URL=... npm run migrate:from-core` — idempotent copy with row-count verification.

## Release

Tag `v*` → CI builds/pushes the image to GHCR and publishes the bundle to the marketplace via the vendor API.
