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

The build runs TypeScript checks, creates the Vite bundle, and generates `sitemap.xml` for `https://kalyanimerchantile.tech` by default. Set `VITE_SITE_URL` to override the canonical domain for another deployment environment.

## Current demo-mode behavior

The phone number and email supplied by the business are in `src/data/siteConfig.ts`; verify they are approved for public use. The quote form now posts to a Vercel serverless endpoint and sends notification email through Zoho SMTP when the required Vercel environment variables are configured. No SMTP password is stored in frontend code. Until those variables are set, the endpoint fails clearly and the form does not claim the message was sent. Product records remain editable sample data, and lift entries remain unpublished until reviewed.

- The sample lift listings are unpublished and marked unreviewed by default. Their model/product details and any imagery must be checked before publication.
- The admin area is **not production-secure**. Its demo password gate and local-storage changes only affect the current browser. Do not use it for real customer records or deployed administration.
- The quote form sends a POST to `api/contact.js`. Set up its Zoho SMTP credentials in Vercel before accepting enquiries; do not put the SMTP password in the frontend or commit it.
- RFQ document upload is disabled until a secure backend storage endpoint exists.
- Empty address, hours, registration and social fields are deliberately hidden. The configured phone and email were provided in the business request; confirm they remain current before launch.
- Canonical URLs and the sitemap use `https://kalyanimerchantile.tech` by default. Set `VITE_SITE_URL` in the Vercel project only when overriding this domain for another environment.

## Enable contact-form email with Zoho on Vercel

In **Vercel → Project → Settings → Environment Variables**, add these values for Production (and Preview if you want to test there):

```text
ZOHO_SMTP_HOST=smtppro.zoho.in
ZOHO_SMTP_PORT=465
ZOHO_SMTP_USER=sales.team@kalyanimerchantile.tech
ZOHO_SMTP_PASSWORD=<Zoho mailbox/app password>
CONTACT_TO=sales.team@kalyanimerchantile.tech
CONTACT_FROM=sales.team@kalyanimerchantile.tech
```

Zoho supports port 465 with SSL or port 587 with TLS; if you use 587, change `ZOHO_SMTP_PORT` to `587`. If the mailbox has multi-factor authentication, use a Zoho app password. Treat `ZOHO_SMTP_PASSWORD` as a sensitive Vercel secret—never commit it or send it in chat. Redeploy after saving environment variables. The API sends to the fixed `CONTACT_TO` address and sets the visitor's email as Reply-To. Email delivery does not save enquiries to a database or the demo admin list; the receiving mailbox is the record.

The standard Vite dev server does not execute Vercel Functions. Test actual email delivery on a Vercel Preview deployment after setting its environment variables.

## Catalogue administration in demo mode

Visit `/admin/login` and enter any non-empty value to open the demonstration area. Manage categories, products, review/publication flags and demo quote records. Changes are browser-local, not shared with visitors or across devices. The review flag is required before publishing a product. The Admin preview route previews unpublished records within the same browser.

## Production launch checklist

1. Verify the owner-supplied phone and email are approved for publication. Confirm any address, registration identifiers, hours and social links with the owner before adding them in `src/data/siteConfig.ts`.
2. Verify the exact manufacturer, model number, category/classification, product descriptions, product photography usage rights and all technical values. Keep unknown specs empty.
3. Review proposed categories and hide any category that is not ready.
4. Connect a Supabase project (or another secured backend). Apply and review `supabase/schema.sql`, configure Auth and add authorized admin user IDs to `public.admin_users` using a trusted provisioning path.
5. Replace `src/lib/data.ts` local-storage functions with a server-backed data client. Keep public reads limited to published catalogue data; never expose a service-role key in the browser. Keep quote-request reads and updates behind authenticated admin RLS.
6. Configure and test the Zoho email endpoint in Vercel. If enquiries also need a shared searchable history in the admin area, connect a secured database; email delivery alone does not persist them there. Add secure document storage separately if uploads are needed.
7. In Vercel, confirm `kalyanimerchantile.tech` is attached to the production project and HTTPS is active. If using another canonical domain, set `VITE_SITE_URL`, redeploy, and verify canonical tags, `robots.txt` and `sitemap.xml`.
8. Test keyboard access, mobile widths, every route, published product details, filters and quote prefill before launch.

## Project structure

- `src/components/` — layout, reusable catalogue cards and homepage sections
- `src/data/` — editable business configuration and demo catalogue records
- `src/pages/` — public pages and demonstration admin screens
- `src/lib/data.ts` — current local-storage data adapter; intended backend seam
- `supabase/schema.sql` — initial schema and row-level security policies for a future Supabase connection
- `scripts/generate-sitemap.mjs` — creates a sitemap using the selected production domain, with `VITE_SITE_URL` as an optional override
