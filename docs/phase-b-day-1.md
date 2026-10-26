# Phase B day 1

Monday, October 26, 2026.

The review host is the AWS staging site at https://18.118.84.127. The admin is https://18.118.84.127/admin. The certificate warning on that address is still expected.

The review accounts are unchanged:

- staging-owner@example.com
- staging-content@example.com
- staging-moderator@example.com
- staging-member@example.com

The password is Review-day9-shell.

Blog posts, glossary terms, cities, and property types are in the admin. Each one has the SEO block: slug, page title, meta description, index or noindex, canonical URL, H1, image alt, social title, social description, and the sitemap flag. A content manager can create and edit them. A moderator cannot. Slugs are unique inside each collection.

The migration is `20261026_102718_marketing_tables`, then `20261026_104936_social_description` for the social description column on pages and listings. Those statements run on the next build of this revision on the AWS host.
