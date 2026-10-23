Phase A review

Phase A is frozen on October 23, 2026. Phase B starts after this review is accepted.

Staging

The staging site is https://18.118.84.127. The certificate warning is expected. The admin is https://18.118.84.127/admin.

Test accounts

The password for each account is Review-day9-shell.

Owner: staging-owner@example.com
Content manager: staging-content@example.com
Moderator: staging-moderator@example.com
Space seeker: staging-member@example.com

Database diagram

The diagram is docs/entity-diagram.md.

Design walkthrough

Homepage and navigation are on the staging site. Search, the public listing page, the public city page, and the broker profile stay as direction for the next phase. The sample listing is 201 N Brand. The sample city page is Glendale. Brokers is https://18.118.84.127/brokers.

Waiting on the company email

The repository is not yet in a company GitHub organization with the company email as owner. Phase B should not treat the repository as company-owned until that transfer is done. Nothing else in this phase is waiting on the company email.

Checked on the staging URL

Checked on October 23, 2026. https://18.118.84.127/health returned 200. The response includes X-Frame-Options SAMEORIGIN and strict transport security. About shows the header, the footer, 201 N Brand Suite 200, and 1-888-518-9168.

Sign-in and sign-out were checked with the space seeker account. The owner can open the audit log. The content manager and the moderator cannot. The moderator can open the 201 N Brand listing. The content manager and the space seeker cannot. The owner can open billing. The content manager cannot. The Glendale page is present. The sample redirect is saved from /listings/brand-glendale to /listings/201-n-brand with status 301.

Companies, company members, deals, deal participants, screening requests, lease drafts, and signed documents are empty.

Still outside these 10 days

Public marketing pages, blog, glossary, and city copy.
Map search, filters, and Mapbox.
Stripe subscriptions and the $129 plans.
Favorites, alerts, and dashboards.
Drupal migration and redirects from myperfectworkplace.com.
Screening, leases, and e-signature.
