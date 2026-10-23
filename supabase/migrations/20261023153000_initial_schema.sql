-- RideNow Phase 3 initial schema.
-- Apply with Supabase CLI or the SQL editor after reviewing this migration.
-- This migration intentionally does not seed demo data or create client write policies
-- for protected ride, fare, assignment, or payment fields.

create extension if not exists pgcrypto;

create type public.profile_role as enum ('passenger', 'driver', 'admin');
create type public.driver_verification_status as enum ('pending', 'verified', 'rejected');
create type public.driver_availability_status as enum ('offline', 'online');
create type public.vehicle_category as enum ('bike', 'auto', 'cab');
create type public.ride_status as enum (
  'requested',
  'accepted',
  'arrived',
  'in_progress',
  'completed',
  'cancelled'
);
create type public.payment_method as enum ('cash', 'card', 'upi', 'wallet');
create type public.payment_status as enum (
  'pending',
  'authorized',
  'paid',
  'failed',
  'refunded',
  'cancelled'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role public.profile_role not null default 'passenger',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_full_name_length check (full_name is null or char_length(full_name) between 1 and 120),
  constraint profiles_phone_length check (phone is null or char_length(phone) between 7 and 32),
  constraint profiles_phone_unique unique (phone)
);

create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  verification_status public.driver_verification_status not null default 'pending',
  availability_status public.driver_availability_status not null default 'offline',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers (id) on delete cascade,
  category public.vehicle_category not null,
  registration_number text not null unique,
  make_model text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint vehicles_registration_length check (char_length(registration_number) between 2 and 32),
  constraint vehicles_make_model_length check (make_model is null or char_length(make_model) between 1 and 120),
  constraint vehicles_driver_assignment_unique unique (driver_id, id, category)
);

create table public.rides (
  id uuid primary key default gen_random_uuid(),
  passenger_id uuid not null references public.profiles (id) on delete restrict,
  assigned_driver_id uuid references public.drivers (id) on delete set null,
  assigned_vehicle_id uuid references public.vehicles (id) on delete set null,
  pickup_address text not null,
  pickup_latitude numeric(9, 6),
  pickup_longitude numeric(9, 6),
  destination_address text not null,
  destination_latitude numeric(9, 6),
  destination_longitude numeric(9, 6),
  vehicle_category public.vehicle_category not null,
  estimated_fare numeric(12, 2),
  final_fare numeric(12, 2),
  status public.ride_status not null default 'requested',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint rides_pickup_address_length check (char_length(pickup_address) between 1 and 500),
  constraint rides_destination_address_length check (char_length(destination_address) between 1 and 500),
  constraint rides_latitude_range check (
    (pickup_latitude is null or pickup_latitude between -90 and 90)
    and (destination_latitude is null or destination_latitude between -90 and 90)
  ),
  constraint rides_longitude_range check (
    (pickup_longitude is null or pickup_longitude between -180 and 180)
    and (destination_longitude is null or destination_longitude between -180 and 180)
  ),
  constraint rides_fare_range check (
    (estimated_fare is null or estimated_fare >= 0)
    and (final_fare is null or final_fare >= 0)
  ),
  constraint rides_assignment_pair check (
    (assigned_driver_id is null) = (assigned_vehicle_id is null)
  ),
  constraint rides_driver_vehicle_category_fk
    foreign key (assigned_driver_id, assigned_vehicle_id, vehicle_category)
    references public.vehicles (driver_id, id, category),
  constraint rides_distinct_addresses check (lower(trim(pickup_address)) <> lower(trim(destination_address)))
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null unique references public.rides (id) on delete cascade,
  amount numeric(12, 2) not null,
  payment_method public.payment_method not null,
  status public.payment_status not null default 'pending',
  provider_reference text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint payments_amount_range check (amount >= 0),
  constraint payments_provider_reference_length check (
    provider_reference is null or char_length(provider_reference) between 1 and 160
  )
);

create index drivers_availability_status_idx on public.drivers (availability_status);
create index vehicles_driver_id_idx on public.vehicles (driver_id);
create index rides_passenger_id_created_at_idx on public.rides (passenger_id, created_at desc);
create index rides_assigned_driver_id_status_idx on public.rides (assigned_driver_id, status);
create index rides_status_created_at_idx on public.rides (status, created_at desc);
create index payments_status_created_at_idx on public.payments (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger drivers_set_updated_at
before update on public.drivers
for each row execute function public.set_updated_at();

create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute function public.set_updated_at();

create trigger rides_set_updated_at
before update on public.rides
for each row execute function public.set_updated_at();

create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

create or replace function public.prevent_self_admin_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
    and new.id = auth.uid()
    and new.role in ('driver', 'admin') then
    raise exception 'Users cannot assign themselves a privileged role';
  end if;
  return new;
end;
$$;

create trigger profiles_prevent_self_admin_role
before insert or update of role on public.profiles
for each row execute function public.prevent_self_admin_role();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'passenger');
  return new;
exception
  when unique_violation then
    raise exception 'Could not provision the profile for the new auth user';
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.is_driver_owner(target_driver_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.drivers
    where id = target_driver_id
      and profile_id = auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.drivers enable row level security;
alter table public.vehicles enable row level security;
alter table public.rides enable row level security;
alter table public.payments enable row level security;

-- Profiles: users can create/read/update their own non-admin profile only.
create policy profiles_select_own_or_admin
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy profiles_insert_own_non_admin
on public.profiles
for insert
to authenticated
with check (id = auth.uid() and role = 'passenger');

create policy profiles_update_own_non_admin
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid() and role = 'passenger');

-- Driver records: drivers can read their own record. Availability and
-- verification changes require trusted server-side authorization.
create policy drivers_select_owner_or_admin
on public.drivers
for select
to authenticated
using (profile_id = auth.uid() or public.is_admin());

create policy drivers_insert_owner
on public.drivers
for insert
to authenticated
with check (
  profile_id = auth.uid()
  and verification_status = 'pending'
  and availability_status = 'offline'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'driver'
  )
);

-- Vehicles: owners can read their vehicles. Creation and all changes require
-- trusted server-side authorization.
create policy vehicles_select_owner_or_admin
on public.vehicles
for select
to authenticated
using (public.is_driver_owner(driver_id) or public.is_admin());

-- Rides: passengers can create a requested ride with no assignment or final
-- fare. All later lifecycle, assignment, and fare changes require trusted code.
create policy rides_select_participant_or_admin
on public.rides
for select
to authenticated
using (
  passenger_id = auth.uid()
  or exists (
    select 1
    from public.drivers
    where drivers.id = rides.assigned_driver_id
    and drivers.profile_id = auth.uid()
  )
  or public.is_admin()
);

create policy rides_insert_requested_by_passenger
on public.rides
for insert
to authenticated
with check (
  passenger_id = auth.uid()
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'passenger'
  )
  and status = 'requested'
  and assigned_driver_id is null
  and assigned_vehicle_id is null
  and estimated_fare is null
  and final_fare is null
);

-- No direct authenticated update/delete policies are intentional. A trusted
-- server-side function/API must validate lifecycle transitions and assignments.

-- Payments are readable only by the passenger, assigned driver, or admin.
-- There are intentionally no client insert/update/delete policies.
create policy payments_select_participant_or_admin
on public.payments
for select
to authenticated
using (
  exists (
    select 1
    from public.rides
    where rides.id = payments.ride_id
      and rides.passenger_id = auth.uid()
  )
  or exists (
    select 1
    from public.rides
    join public.drivers on drivers.id = rides.assigned_driver_id
    where rides.id = payments.ride_id
      and drivers.profile_id = auth.uid()
  )
  or public.is_admin()
);

-- Keep helper functions callable only by the database execution context and
-- authenticated clients as needed by RLS evaluation; they expose booleans only.
revoke all on function public.is_admin() from public;
revoke all on function public.is_driver_owner(uuid) from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_driver_owner(uuid) to authenticated;
