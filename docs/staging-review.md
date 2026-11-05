# Staging review

Thursday, November 5, 2026.

The staging site is [https://18.118.84.127](https://18.118.84.127). The browser warning about the certificate is expected. The admin is [https://18.118.84.127/admin](https://18.118.84.127/admin).

## What to click

Sign in as the content manager. Open Cities, publish Glendale, then change the slug and open the old address. It redirects. Check the sitemap box and confirm `/glendale` is listed. Clear the box and confirm it is gone. Save a record whose URL is already used and read the warning. Open a draft post with `?preview=1` and read "Draft preview".

On the site, open the homepage, About, Blog, a published post, Glossary, a published term, Glendale, Office, Steps, and Scholarship.

## Samples

The sample listing is in Listings. The title is 201 N Brand and the slug is `201-n-brand`. The SEO fields are filled. Index is Noindex, and the sitemap box is unchecked, because a sample listing stays off Featured until Index is chosen.

The sample city is in Cities. The title is Glendale and the slug is `glendale`. The SEO fields are filled. `/glendale` uses the city page when the record is published.

The sample property type is Office. `/office` uses the same place page when the record is published.

The sample draft post is `office-tour-notes`. It stays off the public blog until it is published.

## Test accounts

The password for each account is `Review-day9-shell`.

| Account | Email | What to confirm |
|---|---|---|
| Owner | staging-owner@example.com | Pages, cities, posts, glossary, listings, billing, and the audit log |
| Content manager | staging-content@example.com | Pages, cities, posts, and glossary. Not listings, billing, or the audit log |
| Moderator | staging-moderator@example.com | The 201 N Brand listing and users. Not pages, billing, or the audit log |
| Space seeker | staging-member@example.com | Sign-in on the site. The admin does not open |

## Not built

These stay out of this phase:

- Map search, filters, and Mapbox
- Stripe subscriptions and the $129 plans
- Favorites, alerts, and dashboards
- Terms and Privacy, until the copy is supplied. Until then they stay unpublished and noindex
- The Drupal migration and redirects from the current site
- Screening, leases, and e-signature
- Sentry stays off until a DSN is set
- Listing photos stay on the server disk until an object-storage bucket is set
