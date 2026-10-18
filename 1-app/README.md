# Tidy-ish 0.23 HTML

Local browser translation of the retained `0.23-local` Android source. The original 0.23 APK binary was not available. This stage covers Home, room tasks, Doing Now and laundry, with supporting room management, Settings, Help and backup controls. Calendar, Schedule and Task Data remain for later.

## Open

Double-click **Start Tidy-ish.command** on this Mac, or run:

```sh
python3 -m http.server 8847 --bind 127.0.0.1
```

Run the command from this folder. Open [the app](http://127.0.0.1:8847/index.html) or [the phone preview](http://127.0.0.1:8847/preview.html?width=390).

You can open `index.html` directly for the local features. Account sign-in requires HTTP or HTTPS. Keep using the same origin and port for the same browser data. The normal app storage key is `tidyish-html-v023-board-v1`; QA uses a separate `-qa` key and is never exported in the app package.

## Current behavior

- The supplied house image is displayed through a bottom-cropped viewport, without changing its pixels. Room hit targets and original labels are retained; no duplicate header is added on Home.
- The supplied palette and mess phrases are used. Logo margins are clipped in the page, and the 48 px header matches the sampled logo background.
- Doing Now has its tabs, Add a task and room sections with small guardian symbols, Focus and Tools.
- Tasks support nested children, selection, completion/Undo, First/Last, desktop dragging, stopwatches, editing, delete confirmation and page-scoped Undo deleted.
- Home, Doing Now and Laundry use the same saved load and uniform state. Browser reminders need notification permission and an open page.
- Explicit backup import previews a merge, preserving matching identities. Authentication sessions are not exported. For connected boards, the original shared payload is retained in `sharedSnapshot` in an export.

## Household sharing

The public Supabase project configuration and RPC names match the existing app. The account panel supports existing-email sign-in, household preview/selection, invites/join, local sign-out and foreground sync. The Supabase JS client loads from its CDN only when account functionality is used.

The return address `http://127.0.0.1:8847/index.html` must be allowed in the Supabase project's Auth redirect URLs. No provider settings were changed. See the [Supabase redirect URL documentation](https://supabase.com/docs/guides/auth/redirect-urls).

Shared saves use fetched revisions and retry stale writes up to three times. Simultaneous field edits and completions are reviewed. Unknown payload fields are kept. Appearance settings, personal areas, attachments and active stopwatch starts stay local. Separate account/house caches retain pending browser work when switching.

**Live sign-in and two-person household sharing have not been accepted.** Tests used synthetic data and injected transport; no real household board was opened or changed. Normal load state uses the existing web/Android format. Uniform state between this HTML version uses an added settings record; complete interoperability with older uniform implementations remains unfinished. Unsupported longer custom laundry cycles are rejected before any shared write.

Some cross-client family completions lack enough metadata to reverse safely here, and shared category moves are blocked. These gaps are listed in the accompanying remaining-work document.

## Verification

```sh
node --test tests/model.test.cjs
```

41 automated tests passed. Browser checks included synthetic task creation, room-to-Doing-Now selection, parent completion and Undo, laundry transfer and independent loads, persisted reload, and phone-width layouts at 320/390/430 px. This does not establish physical-device, keyboard, screen-reader or live-account acceptance.

Original asset provenance is recorded in `SOURCE-PROVENANCE.json`. Native source and APKs were not modified. Nothing was published.
