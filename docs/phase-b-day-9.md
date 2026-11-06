# Phase B day 9

Thursday, November 5, 2026.

The content manager pass uses staging-content@example.com at https://18.118.84.127/admin. The password is Review-day9-shell.

Publishing a city and changing its slug stores a 301 from the old address to the new one. Checking the sitemap box adds that city at `/{slug}`. Clearing the box removes it. A slug already used by another record shows "This URL is already used by a page." A draft post opens at `/blog/{slug}?preview=1` for the content manager, and the page says "Draft preview". A signed-out visitor does not get that preview.

The staging notes are in docs/staging-review.md. They name the URL, the four test accounts, what to click, and what is not built. The November 6 walkthrough is in docs/phase-b-walkthrough.md.

Steps and Scholarship are on their public addresses. The blog index uses the insights layout. Homepage search still opens `/featured` and does not call Mapbox.

These checks are in this revision. They show on https://18.118.84.127 after this revision is built on that host.
