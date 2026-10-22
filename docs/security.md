# Security note

## What is stored

An account stores the email, name, company, title, phone numbers, account role, admin role, DRE number, and whether the person lists properties or accepted the coworking referral. The password is stored as a hash. The password itself is not stored. There is no card number field. A billing record stores a refund action and an amount.

A session lasts at most 8 hours. The site ends it after 30 minutes with no activity. Five failed sign-ins lock the account for 15 minutes.

Pages store the page content and the SEO fields. Listings store the listing record and point at a photo in Media. Media stores the file and its alt text. When object storage is on, Media also stores the prefix and the object key. Redirects store the old path and the new path.

The Phase 2 tables are present and empty: companies, company members, deals, deal participants, screening requests, lease drafts, and signed documents.

The audit log stores the time, the actor, the action, and the target. The actions are sign-in, role change, and delete. The target is the collection and the record id, such as `users/12`.

## Who can see it

Pages and media files can be read without signing in. Listings are not public. An owner or a moderator can read and change listings. A content manager can edit pages and cannot edit listings.

An owner can read billing. Redirects and the Phase 2 tables are limited to staff: owner, content manager, and moderator.

A person can read and update their own account. An owner or a moderator can read and update any account. Only an owner can set an admin role.

Only an owner can read the audit log. The admin cannot create, edit, or delete audit rows. The application writes a row when someone signs in, when a role changes, and when a record is deleted.

## How a person is deleted

An Owner or a Moderator deletes the person in the admin. The password hash and the sessions are deleted with the account.

Company member rows and deal participant rows have to be removed first. Those links are required, and the database is set to clear the link on delete, so the database refuses to delete the person while either row still points at them.

The delete writes an audit row. The target is `users/` followed by the id. The time is the row's created time. The actor is the Owner or Moderator who deleted them. If that actor is deleted later, the actor link on older audit rows is cleared and the row remains.

## Backups, errors, and photos

The Neon database in the company account is backed up every day. Each backup is kept for 30 days. Backups are not copied into this repository.

Staging errors are sent to Sentry only when `SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN` is set. Cookies, headers, and the request body are removed before an event is sent. A visitor sees "Something went wrong" and does not see the error text.

Listing photos are stored in object storage when `S3_BUCKET` is set. The region comes from `S3_REGION` and otherwise is `us-east-2`. Without a bucket, photos stay on the server disk.

## Staging responses

The staging site does not send the Next.js server banner. Responses send `nosniff`, a strict referrer policy, and same-origin framing. Production also sends HSTS.
