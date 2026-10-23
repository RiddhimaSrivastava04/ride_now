# RideNow database schema

This document describes the Phase 3 foundation migration in
[`supabase/migrations/20261023153000_initial_schema.sql`](../supabase/migrations/20261023153000_initial_schema.sql).

The migration is prepared but has **not** been applied to the remote Supabase
project. It does not connect the frontend to Supabase and does not replace the
current local mock data.

## Tables

### `profiles`

Extends `auth.users` with application data:

- `id`: UUID primary key and foreign key to `auth.users(id)`
- `full_name`
- `phone`
- `role`: `passenger`, `driver`, or `admin`
- `created_at`, `updated_at`

Users can create and update their own non-admin profile. A user cannot assign
themselves the `driver` or `admin` role. Non-null phone values are unique.
Trusted server-side authorization is required to promote an account to driver
or admin.

### `drivers`

Stores driver-specific state:

- `profile_id`: one-to-one reference to `profiles`
- `verification_status`: `pending`, `verified`, or `rejected`
- `availability_status`: `offline` or `online`
- `created_at`, `updated_at`

Availability and verification changes require trusted server-side
authorization. A driver record created by the client starts pending and
offline. The client profile policy does not permit a user to change their
profile role to `driver`; a trusted workflow must promote the profile first.

### `vehicles`

Stores vehicles owned by drivers:

- `driver_id`
- `category`: `bike`, `auto`, or `cab`
- `registration_number`
- `make_model`
- `created_at`, `updated_at`

Registration numbers are unique. Vehicle creation and protected changes should
be performed by trusted server-side code after validating ownership and
authorization.

### `rides`

Stores passenger ride requests and their lifecycle:

- Passenger, optional assigned driver, and optional assigned vehicle UUIDs
- Pickup and destination addresses
- Optional latitude/longitude coordinates
- Requested vehicle category
- Estimated and final fares
- `status`: `requested`, `accepted`, `arrived`, `in_progress`, `completed`, or
  `cancelled`
- `created_at`, `updated_at`

Coordinates are numeric values with latitude and longitude range checks. Money
uses `numeric(12,2)`, avoiding floating-point currency storage.

Passengers can create only unassigned rides with `requested` status and no
estimated or final fare. Assignment requires both a driver and vehicle, and
the database enforces that the vehicle belongs to that driver and matches the
requested vehicle category. There are no direct authenticated update or delete
policies. Lifecycle transitions, driver/vehicle assignment, fare calculation,
and cancellation authorization must be implemented in trusted server-side
functions or route handlers later.

### `payments`

Stores payment state for a ride:

- One payment row per ride
- `amount`: `numeric(12,2)`
- `payment_method`: `cash`, `card`, `upi`, or `wallet`
- `status`: `pending`, `authorized`, `paid`, `failed`, `refunded`, or
  `cancelled`
- Optional provider reference
- `created_at`, `updated_at`

No card number, CVV, expiry, bank credentials, or other payment-card details
are stored. Payment writes have no client policies and must be performed by
trusted server-side payment integration code in a later phase.

## Row Level Security

RLS is enabled on every application table:

- Profiles: a user reads their own profile; admins can read all profiles.
- Drivers: a driver reads their own record; admins can read all records.
  Driver creation is limited to a driver profile and starts pending/offline.
  Availability and verification changes require trusted server-side
  authorization.
- Vehicles: a driver reads their own vehicles; admins can read all vehicles.
- Rides: passengers see their own rides; assigned drivers see their assigned
  rides; admins can see all rides. Unassigned requested rides are not directly
  readable by drivers.
- Payments: the passenger, assigned driver, or admin can read a payment.

There are intentionally no unrestricted `anon` policies. Protected writes are
omitted rather than exposed through broad client policies.

The future dispatch API must be a trusted server-side operation. Before
returning an unassigned request to a driver, it must verify the driver's
authentication, verified status, online availability, vehicle/category
eligibility, and any required geographic eligibility. It should return only
the minimum request data needed for dispatch.

The `is_admin()` and `is_driver_owner()` helpers use `SECURITY DEFINER` with a
fixed `search_path` and return only boolean authorization results. They should
be reviewed alongside any future policy changes.

The timestamp, role-protection, and Auth profile-provisioning functions are
trigger-only functions. Their default execution behavior is retained so
PostgreSQL can invoke the installed triggers; they do not accept user
arguments and are not useful as ordinary application operations.

## Trusted server-side operations required later

These operations must not be accepted directly from an untrusted browser:

1. Promoting a profile to `admin`.
2. Promoting a passenger profile to `driver`.
3. Changing driver verification or availability status.
4. Creating or changing vehicle records after ownership checks.
5. Assigning a driver or vehicle to a ride.
6. Advancing ride lifecycle status.
7. Calculating or changing estimated/final fares.
8. Dispatching eligible unassigned requests.
9. Creating, authorizing, settling, refunding, or cancelling payments.
10. Calling payment providers or storing provider references.

## Profile provisioning

An `after insert` trigger on `auth.users` creates a profile with only the new
user UUID and the fixed `passenger` role. It does not read user metadata for
roles or other privileged fields. The profile phone is initially null, so the
unique nullable phone constraint cannot cause signup collisions. If profile
creation fails, the signup transaction fails rather than creating an
unprofiled auth user; the trusted signup flow must surface that error and
retry or investigate it.

The trigger function is `SECURITY DEFINER`, fixes its `search_path`, and has
direct execution revoked from `PUBLIC`. Admin/driver promotion remains a
trusted server-side operation.

Future route handlers or database functions should validate authentication,
authorization, allowed state transitions, ownership, and server-calculated
amounts before writing these fields.

## Applying safely

1. Install and authenticate the Supabase CLI.
2. Link the CLI to the intended project.
3. Review the migration and confirm the linked project reference.
4. Apply migrations with the CLI, for example:

   ```bash
   npx supabase db push
   ```

5. Verify the resulting tables, constraints, indexes, RLS settings, and
   policies in a non-production environment first. Specifically test the
   auth-user profile trigger, role changes, nullable paired assignments, and
   RLS visibility as passenger, driver, and admin.
6. Keep the migration in version control.

Do not paste secrets into source files or commit `.env.local`. The current
frontend remains mock-data-only until a later phase explicitly adds a secure
server-side integration.

The migration has not been validated by PostgreSQL or applied to Supabase in
this phase. Production review should also confirm trigger privileges,
`auth.users` trigger behavior, and the exact dispatch authorization design.
