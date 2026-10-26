-- Kalyani Mercantile Supabase starting schema.
-- Apply only after configuring a Supabase project and reviewing access requirements.
-- Public users can read published catalogue data and submit enquiries, but cannot
-- read or update anyone's quote requests. Admin access is granted by inserting an
-- authenticated user's UUID into admin_users with the service-role SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
create policy "Admins can read their own admin membership"
  on public.admin_users for select to authenticated
  using (user_id = auth.uid());
-- Deliberately no authenticated insert/update/delete policies. Grant membership
-- through the Supabase SQL editor or a trusted server-side provisioning path.

create or replace function public.is_kalyani_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;
revoke all on function public.is_kalyani_admin() from public;
grant execute on function public.is_kalyani_admin() to anon, authenticated;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  hidden boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand text,
  model_number text,
  category_id uuid references public.categories(id) on delete set null,
  short_description text not null default '',
  full_description text not null default '',
  specifications jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  applications jsonb not null default '[]'::jsonb,
  image_urls text[] not null default '{}',
  datasheet_url text,
  featured boolean not null default false,
  reviewed boolean not null default false,
  published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  preferred_contact text not null check (preferred_contact in ('email','phone','whatsapp','in-person')),
  delivery_location text not null,
  requested_items jsonb not null,
  purchase_timeline text,
  notes text,
  status text not null default 'new' check (status in ('new','reviewing','supplier-enquiry','quotation-prepared','sent-to-customer','closed')),
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.quote_requests enable row level security;

create policy "Public can read visible categories"
  on public.categories for select to anon, authenticated
  using (not hidden or public.is_kalyani_admin());
create policy "Admins manage categories"
  on public.categories for all to authenticated
  using (public.is_kalyani_admin())
  with check (public.is_kalyani_admin());

create policy "Public can read published products"
  on public.products for select to anon, authenticated
  using ((published and exists (
    select 1 from public.categories c
    where c.id = category_id and not c.hidden
  )) or public.is_kalyani_admin());
create policy "Admins manage products"
  on public.products for all to authenticated
  using (public.is_kalyani_admin())
  with check (public.is_kalyani_admin());

-- Anonymous visitors may create an enquiry; no public select/update/delete
-- policy exists, so submitters cannot enumerate other customers' requests.
create policy "Public can submit quote requests"
  on public.quote_requests for insert to anon, authenticated
  with check (
    length(trim(contact_name)) >= 2 and
    length(trim(company_name)) >= 1 and
    length(trim(email)) >= 5 and
    length(trim(phone)) >= 7 and
    length(trim(delivery_location)) >= 2 and
    jsonb_typeof(requested_items) = 'array' and
    jsonb_array_length(requested_items) > 0
  );
create policy "Admins can view quote requests"
  on public.quote_requests for select to authenticated
  using (public.is_kalyani_admin());
create policy "Admins can update quote requests"
  on public.quote_requests for update to authenticated
  using (public.is_kalyani_admin())
  with check (public.is_kalyani_admin());

create index if not exists products_published_idx on public.products (published);
create index if not exists products_category_idx on public.products (category_id);
create index if not exists quote_requests_created_idx on public.quote_requests (created_at desc);
create index if not exists quote_requests_status_idx on public.quote_requests (status);

-- Grant admin membership after creating the user with Supabase Auth:
-- insert into public.admin_users (user_id) values ('<auth user UUID>');
