# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into this TanStack Start project. Changes include:

- **PostHog packages** installed: `posthog-js`, `posthog-node`, and `@posthog/react`.
- **Environment variables** written to `.env`: `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST`.
- **Vite reverse proxy** configured in `vite.config.ts` routing `/ingest/static`, `/ingest/array`, and `/ingest` to PostHog, avoiding CORS issues.
- **Client-side `PostHogProvider`** wraps the entire app in `src/routes/__root.tsx` with exception tracking and debug mode in development.
- **Clerk user identification** wired via `PostHogClerkIntegration` — calls `posthog.identify()` with Clerk user ID, email, and name when signed in; calls `posthog.reset()` on sign-out.
- **Server-side PostHog singleton** at `src/utils/posthog-server.ts`, ready for use in API routes.
- **6 events** tracked across 3 files, covering the full discovery-to-install funnel.

| Event Name | Description | File |
|---|---|---|
| `browse_registry_clicked` | User clicks the Browse Registry CTA on the homepage. | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks the Publish Skill CTA on the homepage. | `src/routes/index.tsx` |
| `sign_in_clicked` | User clicks the Sign In button in the navbar (top of auth funnel). | `src/components/Navbar.tsx` |
| `skill_card_opened` | User clicks the Open link on a skill card. | `src/components/SkillCard.tsx` |
| `skill_install_command_copied` | User copies the install command from a skill card. | `src/components/SkillCard.tsx` |
| `skill_saved` | User clicks the bookmark button on a skill card. | `src/components/SkillCard.tsx` |

## Next steps

We've built a dashboard and five insights to track key user behaviors:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/491651/dashboard/1778331)
- [Sign-in conversion funnel](https://us.posthog.com/project/491651/insights/bKKRsI8y)
- [Skill discovery trend](https://us.posthog.com/project/491651/insights/tkpQa2cT)
- [Home page CTA clicks](https://us.posthog.com/project/491651/insights/o2AujbLB)
- [Skills saved over time](https://us.posthog.com/project/491651/insights/4e31IGJ8)
- [Install commands copied (30d)](https://us.posthog.com/project/491651/insights/KQf7Dts4)

## Verify before merging

- [ ] Run a full production build (`pnpm build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` to `.env.example` and any onboarding scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — `PostHogClerkIntegration` fires on every mount when the user is already signed in, but verify returning sessions appear correctly in PostHog.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
