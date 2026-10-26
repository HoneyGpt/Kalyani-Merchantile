# Kalyani Mercantile

A responsive B2B product catalogue and procurement enquiry website built with React, TypeScript, Vite and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
```

The build runs TypeScript checks, creates the Vite bundle, and generates `sitemap.xml` only when the real site URL is configured.

## Current demo-mode behavior

No backend credentials or production enquiry service are configured. The phone number and email supplied by the business have been added to `src/data/siteConfig.ts`; verify they are correct and approved for public use before launch. The category names, sample product types and reference counts supplied for the catalogue are displayed as sourcing taxonomy only—not as Kalyani stock, live product listings or confirmed availability. Product records remain editable sample data, and lift entries remain unpublished until verified.

- The sample lift listings are unpublished and marked unreviewed by default. Their model/product details and any imagery must be checked before publication.
- The admin area is **not production-secure**. Its demo password gate and local-storage changes only affect the current browser. Do not use it for real customer records or deployed administration.
- The quote form validates and saves enquiries to the current browser's local storage for preview only. It does **not** email, transmit, or persist enquiries for the business. The confirmation explicitly says this.
- RFQ document upload is disabled until a secure backend storage endpoint exists.
- Empty address, hours, registration and social fields are deliberately hidden. The configured phone and email were provided in the business request; confirm they remain current before launch.
- `VITE_SITE_URL` should be set to the real canonical domain once selected; otherwise canonical URLs and sitemap output are intentionally omitted rather than fabricated.

## Catalogue administration in demo mode

Visit `/admin/login` and enter any non-empty value to open the demonstration area. Manage categories, products, review/publication flags and demo quote records. Changes are browser-local, not shared with visitors or across devices. The review flag is required before publishing a product. The Admin preview route previews unpublished records within the same browser.

## Production launch checklist

1. Verify the owner-supplied phone and email are approved for publication. Confirm any address, registration identifiers, hours and social links with the owner before adding them in `src/data/siteConfig.ts`.
2. Verify the exact manufacturer, model number, category/classification, product descriptions, product photography usage rights and all technical values. Keep unknown specs empty.
3. Review proposed categories and hide any category that is not ready.
4. Connect a Supabase project (or another secured backend). Apply and review `supabase/schema.sql`, configure Auth and add authorized admin user IDs to `public.admin_users` using a trusted provisioning path.
5. Replace `src/lib/data.ts` local-storage functions with a server-backed data client. Keep public reads limited to published catalogue data; never expose a service-role key in the browser. Keep quote-request reads and updates behind authenticated admin RLS.
6. Connect the quote form to a protected, server-validated insert path and secure document storage if uploads are needed. Test success, failure, duplicate submissions and data privacy before accepting real enquiries.
7. Configure `VITE_SITE_URL` to the chosen real HTTPS domain, build again, and verify canonical tags, `robots.txt` and `sitemap.xml` on the deployed site.
8. Test keyboard access, mobile widths, every route, published product details, filters and quote prefill before launch.

## Project structure

- `src/components/` — layout, reusable catalogue cards and homepage sections
- `src/data/` — editable business configuration and demo catalogue records
- `src/pages/` — public pages and demonstration admin screens
- `src/lib/data.ts` — current local-storage data adapter; intended backend seam
- `supabase/schema.sql` — initial schema and row-level security policies for a future Supabase connection
- `scripts/generate-sitemap.mjs` — creates a sitemap only when `VITE_SITE_URL` is a configured absolute URL
