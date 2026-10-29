# Phase B day 4

Thursday, October 29, 2026.

The blog index and the blog post are public. The index lists published posts only, with the date and the author. A draft stays off the index.

A content manager or the owner can open a draft at `/blog/office-tour-notes?preview=1` after signing in. A signed-out visitor and a moderator cannot open that preview. A published post uses its SEO fields for the browser title, meta description, canonical URL, and index or noindex. A draft preview is noindex.

The glossary index lists published terms. A term page shows the term, the definition, and the SEO block.

Changing a post slug stores the old address as a 301 under `/blog/`. Changing a term slug stores the old address as a 301 under `/glossary/`. The redirect is saved the same way a page slug already is.

A sample post, a draft post, and a Cap rate term are seeded when the server starts, if they are not already there. The published post is seeded when a user exists to be its author. These pages show on https://18.118.84.127 after this revision is built on that host.

- https://18.118.84.127/blog
- https://18.118.84.127/blog/how-to-read-a-listing
- https://18.118.84.127/glossary
- https://18.118.84.127/glossary/cap-rate
