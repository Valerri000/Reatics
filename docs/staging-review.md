# Staging review

The staging site is [https://18.118.84.127](https://18.118.84.127). The browser warning about the certificate is expected. The admin is [https://18.118.84.127/admin](https://18.118.84.127/admin).

This revision puts the header, the footer, the buttons, and the sign-in modal on every page. The live site shows that shell after this revision is pulled and rebuilt.

## Samples

The sample listing is in Listings. The title is 201 N Brand and the slug is `201-n-brand`. The SEO fields are filled. Index is Noindex, and the sitemap box is unchecked, because the public listing page is not in this phase.

The sample city is in Pages. The title is Glendale and the slug is `glendale`. The SEO fields are filled. The public city layout is not built, so `/glendale` is not a designed city page.

## Test accounts

The password for each account is `Review-day9-shell`.

| Account | Email | What to confirm |
|---|---|---|
| Owner | staging-owner@example.com | Pages, listings, billing, and the audit log |
| Content manager | staging-content@example.com | The Glendale page. Not listings, billing, or the audit log |
| Moderator | staging-moderator@example.com | The 201 N Brand listing and users. Not pages, billing, or the audit log |
| Space seeker | staging-member@example.com | Sign-in on the site. The admin does not open |
