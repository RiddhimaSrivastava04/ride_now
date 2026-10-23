# RideNow project instructions

## Project purpose

Build a ride-booking web platform inspired by Uber, Ola, and Rapido.

## Planned architecture

- Frontend: Next.js App Router, React, TypeScript, and Tailwind CSS.
- Backend: Next.js Route Handlers and server-side business logic.
- Database and authentication: Supabase PostgreSQL and Supabase Auth, to be added in a later phase.
- Maps: a suitable map provider, to be integrated later.
- Testing: automated unit and browser tests, introduced as appropriate.

## Development rules

- Use TypeScript and maintain strict typing.
- Prefer small, reusable, well-named components.
- Separate UI components, business logic, database access, validation, and shared types.
- Validate untrusted input on the server.
- Enforce authentication and authorization for protected operations.
- Never expose secret keys or privileged database credentials in client-side code.
- Use environment variables for credentials.
- Use database migrations when the database is introduced.
- Enforce database access policies when Supabase is introduced.
- Avoid unnecessary dependencies.
- Do not rewrite working code or change architecture without explaining the reason.
- Do not claim that a feature works unless it has been implemented and tested.
- Implement only the current phase unless I explicitly authorize moving to another phase.

## Copilot workflow

1. Inspect relevant existing files before editing.
2. Explain the planned changes briefly.
3. Make focused changes.
4. Run available lint, type-check, build, and test commands where applicable.
5. Report files changed, commands executed, results, and unresolved issues.
6. If a command fails, investigate the actual error rather than hiding it.
